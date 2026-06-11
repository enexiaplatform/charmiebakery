(function () {
  const articles = (window.CHARMIE_ARTICLES || []).slice().sort((a, b) => a.order - b.order);

  function articleUrl(slug) {
    return `article.html?slug=${encodeURIComponent(slug)}`;
  }

  function cardImage(image) {
    return image.replace(/\.jpg$/i, "-640.jpg");
  }

  function renderCard(article) {
    return `
      <a class="j-card" href="${articleUrl(article.slug)}" data-level="${article.level}" data-search-text="${[
        article.title,
        article.summary,
        article.level,
        ...article.sections.map((section) => section.title),
        ...article.takeaways
      ].join(" ")}">
        <div class="j-card-image">
          <img src="${cardImage(article.image)}" alt="${article.title}" loading="lazy" decoding="async">
          <span class="j-level">${article.level}</span>
        </div>
        <div class="j-card-body">
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <div class="j-card-meta">
            <span>${article.readTime}</span>
            <span class="j-card-link">Đọc bài →</span>
          </div>
        </div>
      </a>
    `;
  }

  function initHub() {
    const grid = document.querySelector("[data-journal-grid]");
    if (!grid) return;

    grid.innerHTML = articles.map(renderCard).join("");

    const filters = document.querySelectorAll("[data-filter]");
    const empty = document.querySelector("[data-empty]");
    const search = document.querySelector("[data-search]");
    const resultCount = document.querySelector("[data-result-count]");
    let activeLevel = "Tất cả";
    let query = "";

    function normalize(value) {
      return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim();
    }

    function applyFilters() {
      let visible = 0;
      const normalizedQuery = normalize(query);

      grid.querySelectorAll(".j-card").forEach((card) => {
        const matchesLevel = activeLevel === "Tất cả" || card.dataset.level === activeLevel;
        const matchesQuery = !normalizedQuery || normalize(card.dataset.searchText).includes(normalizedQuery);
        const show = matchesLevel && matchesQuery;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (empty) empty.style.display = visible ? "none" : "block";
      if (resultCount) resultCount.textContent = `${visible} bài viết`;
    }

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeLevel = button.dataset.filter;
        filters.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        applyFilters();
      });
    });

    if (search) {
      search.addEventListener("input", () => {
        query = search.value;
        applyFilters();
      });
    }

    applyFilters();
  }

  function initArticle() {
    const root = document.querySelector("[data-article-root]");
    if (!root) return;

    const slug = new URLSearchParams(window.location.search).get("slug");
    const article = articles.find((item) => item.slug === slug);

    if (!article) {
      root.innerHTML = `
        <section class="j-not-found j-shell">
          <span class="j-eyebrow">Charmie Journal</span>
          <h1 class="j-page-title">Không tìm thấy bài viết.</h1>
          <p>Đường dẫn có thể đã thay đổi.</p>
          <a class="j-nav-home" href="index.html">Về thư viện</a>
        </section>
      `;
      return;
    }

    document.title = `${article.title} — Charmie Journal`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", article.summary);
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}${window.location.pathname}?slug=${encodeURIComponent(article.slug)}`;
    if (!canonical.parentNode) document.head.appendChild(canonical);
    const index = articles.findIndex((item) => item.slug === article.slug);
    const next = articles[(index + 1) % articles.length];
    const related = articles
      .filter((item) => item.slug !== article.slug && item.level === article.level)
      .slice(0, 2);

    const structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.summary,
      image: new URL(article.image, window.location.href).href,
      author: { "@type": "Organization", name: "Charmie" },
      publisher: { "@type": "Organization", name: "Charmie" },
      inLanguage: "vi"
    });
    document.head.appendChild(structuredData);

    const sectionLinks = article.sections.map((section, sectionIndex) => (
      `<a href="#section-${sectionIndex + 1}">${section.title}</a>`
    )).join("");

    const sections = article.sections.map((section, sectionIndex) => `
      <section class="j-section" id="section-${sectionIndex + 1}">
        <h2>${section.title}</h2>
        ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
    `).join("");

    const safety = article.safety ? `
      <div class="j-safety">
        <strong>Lưu ý an toàn</strong>
        ${article.safety}
      </div>
    ` : "";

    const sources = article.sources && article.sources.length ? `
      <section class="j-sources">
        <h2>Nguồn đọc thêm</h2>
        ${article.sources.map((source) => (
          `<a href="${source.url}" target="_blank" rel="noopener">${source.label}</a>`
        )).join("")}
      </section>
    ` : "";

    root.innerHTML = `
      <header class="j-article-hero">
        <div class="j-shell">
          <div class="j-breadcrumbs">
            <a href="../index.html">Charmie</a>
            <span>/</span>
            <a href="index.html">Journal</a>
            <span>/</span>
            <span>${article.level}</span>
          </div>
          <div class="j-article-head">
            <div>
              <span class="j-eyebrow">${article.level}</span>
              <h1 class="j-article-title">${article.title}</h1>
              <p class="j-article-deck">${article.summary}</p>
              <div class="j-article-meta">
                <span>${article.readTime} đọc</span>
                <span>Bài ${article.order} / ${articles.length}</span>
              </div>
            </div>
            <div class="j-article-image">
              <img src="${article.image}" alt="${article.title}" width="1122" height="1402" decoding="async">
            </div>
          </div>
        </div>
      </header>

      <main class="j-shell j-article-layout" id="article-content" tabindex="-1">
        <article class="j-prose">
          <p class="j-intro">${article.intro}</p>
          ${sections}
          <section class="j-takeaways">
            <h2>Điều cần nhớ</h2>
            <ul>${article.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
          ${safety}
          ${sources}
          <section class="j-related">
            <div class="j-related-head">
              <h2>Đọc tiếp cùng chủ đề</h2>
              <a href="index.html">Xem toàn bộ thư viện →</a>
            </div>
            <div class="j-related-grid">
              ${related.map((item) => `
                <a class="j-related-card" href="${articleUrl(item.slug)}">
                  <span>${item.level} · ${item.readTime}</span>
                  <strong>${item.title}</strong>
                </a>
              `).join("")}
            </div>
          </section>
        </article>

        <aside class="j-aside">
          <span class="j-aside-label">Trong bài này</span>
          <nav class="j-aside-links">${sectionLinks}</nav>
          <a class="j-next" href="${articleUrl(next.slug)}">
            <small>Đọc tiếp · ${next.level}</small>
            <strong>${next.title}</strong>
          </a>
        </aside>
      </main>
    `;
  }

  initHub();
  initArticle();
})();
