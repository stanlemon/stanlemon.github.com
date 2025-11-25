require("dotenv").config();

const SyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const MarkdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");
const { parseImageArgs } = require("./lib/image-tag");
const { filterPosts, filterPinnedPosts, filterRecentPosts } = require("./lib/collections");
const { paginate } = require("./lib/filters");

const markdown = new MarkdownIt({ html: true });

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(SyntaxHighlight);

  // Image tag for responsive images
  eleventyConfig.addLiquidTag("image", (liquidEngine) => {
    return {
      parse: function(tagToken) {
        // Store raw args string
        this.args = tagToken.args;
      },
      render: async function(scope, hash) {
        const { src, alt, className } = parseImageArgs(this.args);

        let metadata = await Image(src, {
          widths: [300, 600, 1200],
          formats: ["webp", "jpeg"],
          outputDir: "./_site/img/",
          urlPath: "/img/",
        });

        let imageAttributes = {
          alt,
          sizes: "100vw",
          loading: "lazy",
          decoding: "async",
        };

        if (className) {
          imageAttributes.class = className;
        }

        return Image.generateHTML(metadata, imageAttributes);
      }
    };
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Copy FontAwesome font files to css directory
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/webfonts": "css"
  });

  // Watch Less files for changes during development
  eleventyConfig.addWatchTarget('./css/*.less');

  eleventyConfig.addCollection("posts", (collection) => {
    const posts = collection.getFilteredByGlob("_posts/**/*.md");
    return filterPosts(posts, { showDrafts: !!process.env.SHOW_DRAFTS });
  });

  eleventyConfig.addCollection("pinnedPosts", (collection) => {
    const posts = collection.getFilteredByGlob("_posts/**/*.md");
    return filterPinnedPosts(posts, { showDrafts: !!process.env.SHOW_DRAFTS });
  });

  eleventyConfig.addCollection("recentPosts", (collection) => {
    const posts = collection.getFilteredByGlob("_posts/**/*.md");
    return filterRecentPosts(posts, { showDrafts: !!process.env.SHOW_DRAFTS });
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  // Treat a variable or string as liquid and render it (rather than simply print it)
  eleventyConfig.addLiquidTag("liquidify", (liquidEngine) => {
    return {
      parse: (tagToken, remainingTokens) => {
        this.str = tagToken.args;
      },
      render: async (scope, hash) => {
        // Resolve variables
        const value = liquidEngine.evalValueSync(this.str, scope);
        // Render the variable as liquid first (now async-compatible)
        const liquidRendered = await liquidEngine.parseAndRender(
          value,
          scope
        );
        // Then render markdown content
        return markdown.render(liquidRendered);
      },
    };
  });

  eleventyConfig.addLiquidFilter("paginate", paginate);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site", // Equivalent to Jekyll's destination property
    },
  };
};
