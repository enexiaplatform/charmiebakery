import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const journalDir = path.join(root, "journal");
const dataPath = path.join(journalDir, "data", "articles.js");
const siteUrl = "https://charmiebakery.vercel.app";
const publishedDate = "2026-06-11";

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), context);
const articles = context.window.CHARMIE_ARTICLES.slice().sort((a, b) => a.order - b.order);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absoluteImage(image) {
  return `${siteUrl}/${image.replace("../", "")}`;
}

function articleUrl(slug) {
  return `${siteUrl}/journal/${slug}/`;
}

function articlePath(slug) {
  return `../${slug}/`;
}

function renderJsonLd(article) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        image: [absoluteImage(article.image)],
        datePublished: publishedDate,
        dateModified: publishedDate,
        author: {
          "@type": "Organization",
          name: "Charmie",
          url: siteUrl
        },
        publisher: {
          "@type": "Organization",
          name: "Charmie",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/uploads/charmie-favicon.png`
          }
        },
        mainEntityOfPage: articleUrl(article.slug),
        inLanguage: "vi"
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Charmie",
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Charmie Journal",
            item: `${siteUrl}/journal/`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl(article.slug)
          }
        ]
      }
    ]
  }).replaceAll("<", "\\u003c");
}

function renderArticle(article, index) {
  const next = articles[(index + 1) % articles.length];
  const related = articles
    .filter((item) => item.slug !== article.slug && item.level === article.level)
    .slice(0, 2);

  const sections = article.sections.map((section, sectionIndex) => `
      <section class="j-section" id="section-${sectionIndex + 1}">
        <h2>${escapeHtml(section.title)}</h2>
        ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n        ")}
      </section>`).join("");

  const sectionLinks = article.sections.map((section, sectionIndex) => (
    `<a href="#section-${sectionIndex + 1}">${escapeHtml(section.title)}</a>`
  )).join("\n          ");

  const safety = article.safety ? `
      <div class="j-safety">
        <strong>Lưu ý an toàn</strong>
        ${escapeHtml(article.safety)}
      </div>` : "";

  const sources = article.sources?.length ? `
      <section class="j-sources">
        <h2>Nguồn đọc thêm</h2>
        ${article.sources.map((source) => (
          `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`
        )).join("\n        ")}
      </section>` : "";

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(article.summary)}">
  <meta name="author" content="Charmie">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="Charmie Journal">
  <meta property="og:title" content="${escapeHtml(article.title)}">
  <meta property="og:description" content="${escapeHtml(article.summary)}">
  <meta property="og:url" content="${articleUrl(article.slug)}">
  <meta property="og:image" content="${absoluteImage(article.image)}">
  <meta name="twitter:card" content="summary_large_image">
  <title>${escapeHtml(article.title)} — Charmie Journal</title>
  <link rel="canonical" href="${articleUrl(article.slug)}">
  <link rel="icon" type="image/png" href="../../uploads/charmie-favicon.png">
  <link rel="apple-touch-icon" href="../../uploads/charmie-favicon.png">
  <link rel="stylesheet" href="../assets/journal.css">
  <script type="application/ld+json">${renderJsonLd(article)}</script>
</head>
<body>
  <a class="j-skip-link" href="#article-content">Bỏ qua điều hướng</a>
  <nav class="j-nav">
    <div class="j-shell j-nav-inner">
      <a class="j-brand" href="../../index.html">Charmie</a>
      <div class="j-nav-links">
        <a class="j-nav-start" href="../start.html">Bắt đầu</a>
        <a href="../">Tất cả bài viết</a>
        <a href="../glossary.html">Từ điển</a>
        <a href="../lab.html">Charmie Lab</a>
        <a class="j-nav-home" href="../../index.html">Về cửa hàng</a>
      </div>
    </div>
  </nav>

  <header class="j-article-hero">
    <div class="j-shell">
      <div class="j-breadcrumbs">
        <a href="../../index.html">Charmie</a>
        <span>/</span>
        <a href="../">Journal</a>
        <span>/</span>
        <span>${escapeHtml(article.level)}</span>
      </div>
      <div class="j-article-head">
        <div>
          <span class="j-eyebrow">${escapeHtml(article.level)}</span>
          <h1 class="j-article-title">${escapeHtml(article.title)}</h1>
          <p class="j-article-deck">${escapeHtml(article.summary)}</p>
          <div class="j-article-meta">
            <span>${escapeHtml(article.readTime)} đọc</span>
            <span>Bài ${article.order} / ${articles.length}</span>
          </div>
        </div>
        <div class="j-article-image">
          <img src="../../${article.image.replace("../", "")}" alt="${escapeHtml(article.title)}" width="1122" height="1402" decoding="async">
        </div>
      </div>
    </div>
  </header>

  <main class="j-shell j-article-layout" id="article-content" tabindex="-1">
    <article class="j-prose">
      <p class="j-intro">${escapeHtml(article.intro)}</p>
      ${sections}
      <section class="j-takeaways">
        <h2>Điều cần nhớ</h2>
        <ul>
          ${article.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n          ")}
        </ul>
      </section>
      ${safety}
      ${sources}
      <section class="j-related">
        <div class="j-related-head">
          <h2>Chưa biết nên đọc gì tiếp?</h2>
          <a href="../start.html">Chọn lộ trình phù hợp →</a>
        </div>
      </section>
      <section class="j-related">
        <div class="j-related-head">
          <h2>Đọc tiếp cùng chủ đề</h2>
          <a href="../">Xem toàn bộ thư viện →</a>
        </div>
        <div class="j-related-grid">
          ${related.map((item) => `
          <a class="j-related-card" href="${articlePath(item.slug)}">
            <span>${escapeHtml(item.level)} · ${escapeHtml(item.readTime)}</span>
            <strong>${escapeHtml(item.title)}</strong>
          </a>`).join("")}
        </div>
      </section>
    </article>

    <aside class="j-aside">
      <span class="j-aside-label">Trong bài này</span>
      <nav class="j-aside-links">
        ${sectionLinks}
      </nav>
      <a class="j-next" href="${articlePath(next.slug)}">
        <small>Đọc tiếp · ${escapeHtml(next.level)}</small>
        <strong>${escapeHtml(next.title)}</strong>
      </a>
    </aside>
  </main>

  <footer class="j-footer">
    <div class="j-shell j-footer-inner">
      <span>© 2026 Charmie Journal · Tiramisu Artisanal · Ho Chi Minh City</span>
      <div class="j-footer-links">
        <a href="../about.html">Về Charmie</a>
        <a href="../editorial.html">Biên tập</a>
        <a href="../privacy.html">Riêng tư</a>
        <a href="../affiliate-disclosure.html">Affiliate</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}

for (const [index, article] of articles.entries()) {
  const outputDir = path.join(journalDir, article.slug);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), renderArticle(article, index), "utf8");
}

const staticUrls = [
  `${siteUrl}/`,
  `${siteUrl}/journal/`,
  `${siteUrl}/journal/glossary.html`,
  `${siteUrl}/journal/lab.html`,
  `${siteUrl}/journal/start.html`,
  `${siteUrl}/journal/about.html`,
  `${siteUrl}/journal/editorial.html`,
  `${siteUrl}/journal/privacy.html`,
  `${siteUrl}/journal/affiliate-disclosure.html`,
  ...articles.map((article) => articleUrl(article.slug))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`Generated ${articles.length} static Journal articles and sitemap.xml.`);
