(function () {
  const articles = (window.CHARMIE_ARTICLES || []).slice().sort((a, b) => a.order - b.order);

  function articleUrl(slug) {
    return `article.html?slug=${encodeURIComponent(slug)}`;
  }

  function renderCard(article) {
    return `
      <a class="j-card" href="${articleUrl(article.slug)}" data-level="${article.level}">
        <div class="j-card-image">
          <img src="${article.image}" alt="${article.title}">
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

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const level = button.dataset.filter;
        filters.forEach((item) => item.classList.toggle("is-active", item === button));

        let visible = 0;
        grid.querySelectorAll(".j-card").forEach((card) => {
          const show = level === "Tất cả" || card.dataset.level === level;
          card.hidden = !show;
          if (show) visible += 1;
        });

        if (empty) empty.style.display = visible ? "none" : "block";
      });
    });
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
    const index = articles.findIndex((item) => item.slug === article.slug);
    const next = articles[(index + 1) % articles.length];

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
              <img src="${article.image}" alt="${article.title}">
            </div>
          </div>
        </div>
      </header>

      <main class="j-shell j-article-layout">
        <article class="j-prose">
          <p class="j-intro">${article.intro}</p>
          ${sections}
          <section class="j-takeaways">
            <h2>Điều cần nhớ</h2>
            <ul>${article.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
          ${safety}
          ${sources}
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
