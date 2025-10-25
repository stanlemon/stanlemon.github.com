# stanlemon.com - Technical Documentation

## Project Overview

This is Stan Lemon's personal website/blog, built with [Eleventy](https://www.11ty.dev) (11ty) static site generator. The site is deployed to GitHub Pages and features responsive images, syntax highlighting, RSS feeds, and SEO optimization.

**Repository**: https://github.com/stanlemon/stanlemon.github.com
**Live Site**: https://stanlemon.com
**Node Version**: 22.20.0 (see `.nvmrc`)

## Architecture

### Static Site Generator
- **Framework**: Eleventy 3.1.2
- **Template Engine**: Liquid (primary)
- **CSS Preprocessor**: Less
- **Build Tool**: npm scripts

### Key Technologies
- `@11ty/eleventy-img` - Responsive image generation (WebP + JPEG)
- `@11ty/eleventy-plugin-rss` - RSS feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` - Code syntax highlighting
- `@fortawesome/fontawesome-free` - Icon library
- `dotenv` - Environment variable management

## Directory Structure

```
.
├── _data/              # Global data files (site.js)
├── _includes/          # Liquid templates and layouts
│   ├── article.liquid  # Article component
│   ├── default.liquid  # Default page layout
│   ├── page.liquid     # Page layout
│   └── post.liquid     # Post layout
├── _posts/             # Blog posts organized by year
│   ├── 2013/
│   ├── 2014/
│   └── ...
├── _site/              # Generated static site (git ignored)
├── assets/             # Static assets (images, fonts, etc.)
├── css/                # Less stylesheets
│   ├── main.11ty.js    # Eleventy template that compiles Less
│   ├── main.less       # Main stylesheet (entry point)
│   └── images.less     # Image styling rules
├── .eleventy.js        # Eleventy configuration
├── blog.liquid         # Blog listing page template
├── feed.liquid         # RSS feed template
├── sitemap.liquid      # XML sitemap template
└── index.md            # Homepage
```

## Build & Development Workflow

### Available npm Scripts

```bash
# Development server with live reload (port 3000)
npm run serve

# Full production build
npm run build

# Individual build steps
npm run clean        # Remove _site directory
npm run site         # Run Eleventy build (includes Less compilation and font copying)
```

### Development Server
```bash
npm install
npm run serve
```
Access at http://localhost:3000

### Production Build
```bash
npm run build
```

## Configuration Files

### .eleventy.js
Main Eleventy configuration containing:
- Custom Liquid tags (`image`, `liquidify`)
- Collections (`posts`, `pinnedPosts`, `recentPosts`)
- Passthrough file copies (assets, fonts, etc.)
- Watch targets (Less files)
- Front matter parsing options
- Custom filters (`paginate`)

### css/main.11ty.js
JavaScript template that compiles Less during Eleventy builds:
- Reads `css/main.less` as input
- Compiles to CSS using the Less library
- Outputs to `/css/main.css` in the build
- Compresses CSS when `NODE_ENV=production`
- Maintains source map support for debugging

### _data/site.js
Global site data:
- Site name, title, author
- Social media handles
- Site URL (environment-aware)
- Google Analytics ID

### package.json
Project metadata and dependencies. Version is automatically managed.

## Custom Liquid Tags

### {% image %} Tag
Generates responsive images with multiple formats and sizes.

**Usage**:
```liquid
{% image "./assets/image.jpg", "Alt text description" %}
```

**Output**:
- WebP format (preferred)
- JPEG fallback
- Three sizes: 300w, 600w, 1200w
- Lazy loading enabled
- Async decoding

**Configuration** (in .eleventy.js):
```javascript
widths: [300, 600, 1200]
formats: ["webp", "jpeg"]
outputDir: "./_site/img/"
urlPath: "/img/"
```

### {% liquidify %} Tag
Renders Liquid template variables as Liquid+Markdown content.

**Usage**:
```liquid
{% liquidify page.data.page.excerpt %}
```

**Important**: This tag is async-compatible, allowing it to work with async tags like `{% image %}` in rendered content.

## Content Organization

### Blog Posts

Posts are markdown files in `_posts/YYYY/YYYY-MM-DD-title.md` format.

**Required Front Matter**:
```yaml
---
layout: post
title: Post Title
date: YYYY-MM-DDTHH:MM-ZZ:ZZ
categories:
  - Category Name
permalink: /YYYY/MM/DD/post-title/
metadata:
  description: SEO description
  keywords: comma, separated, keywords
---
```

**Optional Front Matter**:
- `pinned: true` - Pin post to homepage (if older than 6 months)
- `draft: true` - Hide post (unless SHOW_DRAFTS env var is set)
- `active: false` - Completely hide post from collections

**Excerpt Marker**:
Use `<!-- excerpt -->` to mark where blog listing previews should end.

**Important**: Place images AFTER the excerpt marker to avoid async rendering issues in blog listings.

### Collections

#### posts
All published blog posts (filtered by `draft` and `active` flags).

#### pinnedPosts
Posts with `pinned: true` that are older than 6 months. Recent posts are excluded as they appear in `recentPosts`.

#### recentPosts
Posts from the last 6 months, sorted by date descending.

## Image Handling

### Source Images
- Place source images in `assets/` directory
- Use high-resolution images as the single source
- The `{% image %}` tag will automatically generate optimized versions

### Generated Images
- Output to `_site/img/` (not committed to git)
- Multiple formats (WebP preferred, JPEG fallback)
- Multiple sizes for responsive loading
- Lazy loading and async decoding enabled

### CSS Constraints
Images within `<article>` tags are constrained to 90% max-width via `css/images.less`:

```less
article picture,
article figure {
  max-width: 90%;
  margin: 25px auto;
}
```

## Styling

### Less Compilation
Less is integrated directly into Eleventy's build pipeline via `css/main.11ty.js`. This JavaScript template:
- Compiles `css/main.less` during Eleventy builds
- Outputs to `_site/css/main.css`
- Compresses CSS when `NODE_ENV=production`
- Automatically watches Less files during development (`npm run serve`)
- Triggers browser reload when Less files change

### Main Stylesheet Structure
- `main.less` - Main stylesheet with imports
- `images.less` - Image-specific styles
- Variables and mixins defined in `_variables.less`
- Compiled via `css/main.11ty.js` during build

## CI/CD

### GitHub Actions Workflow

**ci.yml** (All branches):
- Runs on every push to any branch
- Installs dependencies
- Runs tests (`npm test`)
- Builds the site (`npm run build`)
- Deploys to GitHub Pages (only on `master` branch)

### Testing

This project uses Node's native test runner for validation:
- **39 comprehensive tests** covering all custom JavaScript logic
- Tests run automatically before every build
- Test files located in `test/` directory
- Business logic extracted to `lib/` directory for testability

**Test Coverage**:
- Collection filters (posts, pinnedPosts, recentPosts)
- Pagination logic
- Image tag argument parsing
- Less CSS compilation

## Environment Variables

### Local Development
Create a `.env` file (git ignored):
```
SHOW_DRAFTS=true        # Show draft posts
SITE_URL=''             # Use relative URLs for local dev
```

### Production
Environment variables are managed through GitHub repository settings:
- `SITE_URL` defaults to `https://stanlemon.com` if not set

## Best Practices & Development Workflow

### Multi-Phase Planning
When working on complex features:

1. **Plan**: Break work into discrete phases
2. **Implement**: Complete one phase at a time
3. **Verify**: Run `npm run build` and verify success
4. **Commit**: Make a git commit after each phase completes
5. **Document**: Update CLAUDE.md and README.md with important information
6. **Iterate**: Proceed to next phase

### Git Commit Messages
- Use descriptive, imperative mood messages
- Include context about what and why
- Add co-author attribution for AI-assisted changes:
  ```
  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Build Verification
Always verify builds succeed before committing:
```bash
npm run build
```

If build fails, investigate and fix the root cause rather than papering over errors.

### Code Quality
- Keep CSS organized and avoid over-specific selectors
- Prefer semantic HTML in Liquid templates
- Use Eleventy's built-in features over custom solutions when possible
- Avoid "jerry-rigging" - fix problems at their source

### Documentation
- Update this CLAUDE.md when making architectural changes
- Keep README.md user-focused and concise
- Document breaking changes and migration paths
- Include examples for complex features

### Image Guidelines
- Always use the `{% image %}` tag for content images
- Place images after `<!-- excerpt -->` markers
- Use descriptive alt text for accessibility
- Provide high-resolution source images

### Content Guidelines
- Use meaningful front matter metadata
- Write SEO-friendly descriptions
- Tag posts with relevant keywords
- Use excerpt markers to control preview length

## Troubleshooting

### Build Failures
1. Check `.eleventy.js` for syntax errors
2. Verify all Liquid tags have proper syntax
3. Ensure images referenced in posts exist
4. Check for async/sync compatibility issues with custom tags

### Liquid Rendering Issues
- The `liquidify` tag is async - ensure it's used in async-compatible contexts
- Avoid placing `{% image %}` tags before `<!-- excerpt -->` markers
- Check quote matching in tag parameters

### CSS Not Updating
- Less is automatically compiled during builds
- Check for Less syntax errors in build output
- Ensure `.eleventy.js` has `addWatchTarget('./css/*.less')`
- Clear `_site/` and rebuild with `npm run build`

### Images Not Generating
- Verify source image path is correct (relative to post location)
- Check `.eleventy.js` image tag configuration
- Ensure `_site/img/` directory is created
- Look for errors in build output

## Deployment

Site automatically deploys to GitHub Pages when changes are pushed to the `master` branch.

**Deployment URL**: https://stanlemon.com
**Custom Domain**: Configured via `CNAME` file

## Additional Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Liquid Template Language](https://liquidjs.com/)
- [Less CSS Documentation](http://lesscss.org/)
- [@11ty/eleventy-img Plugin](https://www.11ty.dev/docs/plugins/image/)

---

**Last Updated**: 2025-10-25
**Eleventy Version**: 3.1.2
**Node Version**: 22.20.0
