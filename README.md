# Stan Lemon's Website

Personal website and blog of Stan Lemon, built with [Eleventy](https://www.11ty.dev).

🌐 **Live Site**: https://stanlemon.com

## Quick Start

### Prerequisites
- Node.js 22.20.0 (see `.nvmrc`)
- npm

### Development
```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run serve
```

### Build
```bash
# Full production build
npm run build
```

## Writing Posts

Create a new markdown file in `_posts/YYYY/YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: Your Post Title
date: YYYY-MM-DDTHH:MM-ZZ:ZZ
categories:
  - Category Name
permalink: /YYYY/MM/DD/post-title/
metadata:
  description: SEO description
  keywords: comma, separated, keywords
---

Your post introduction goes here...

<!-- excerpt -->

The rest of your post content...

## Add Images

{% image "./assets/image.jpg", "Alt text description" %}
```

## Project Structure

- `_posts/` - Blog posts organized by year
- `_includes/` - Liquid templates and layouts
- `_data/` - Global site data
- `assets/` - Static assets (images, etc.)
- `css/` - Less stylesheets
- `eleventy.config.js` - Build configuration (ESM)

## Key Features

- 📱 Responsive design
- 🖼️ Automatic image optimization (WebP + JPEG)
- 📝 Markdown with Liquid templating
- 🎨 Less CSS preprocessing
- 🔍 SEO optimized with meta tags and sitemap
- 📡 RSS feed
- 💻 Syntax highlighting for code
- 📌 Pinned posts on homepage
- 📦 Native ES modules (`"type": "module"`) across custom build logic

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `master` branch.

## Documentation

For technical details, architecture, and development best practices, see [CLAUDE.md](./CLAUDE.md).

## License

MIT - See [LICENSE](./LICENSE) if present.

---

**Repository**: [github.com/stanlemon/stanlemon.github.com](https://github.com/stanlemon/stanlemon.github.com)
