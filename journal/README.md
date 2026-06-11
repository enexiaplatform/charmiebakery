# Charmie Journal

## Structure

- `index.html`: knowledge library, text search, and level filters.
- `article.html`: shared article reader.
- `lab.html`: batch scaling, troubleshooting, costing, and local batch logs.
- `data/articles.js`: article content and metadata.
- `assets/journal.css`: Journal visual system and responsive layout.
- `assets/journal.js`: card rendering, filtering, and article routing.
- `assets/lab.js`: interactive calculations, diagnosis, costing, and local storage.

The library currently contains 16 articles across four learning levels. Article
pages include structured data, same-level recommendations, and lazy-loaded images.

## Add an article

Add one object to `window.CHARMIE_ARTICLES` in `data/articles.js`.

Required fields:

- `slug`
- `level`
- `order`
- `title`
- `summary`
- `readTime`
- `image`
- `intro`
- `sections`
- `takeaways`

Optional fields:

- `safety`
- `sources`

Article links use:

`article.html?slug=your-article-slug`
