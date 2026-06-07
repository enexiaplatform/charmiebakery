# Charmie Journal

## Structure

- `index.html`: knowledge library and level filters.
- `article.html`: shared article reader.
- `data/articles.js`: article content and metadata.
- `assets/journal.css`: Journal visual system and responsive layout.
- `assets/journal.js`: card rendering, filtering, and article routing.

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
