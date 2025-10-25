require("dotenv").config();

const SyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const MarkdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

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
        // Parse the raw arguments string
        const argStr = this.args.trim();

        // Match quoted strings - extract content between quotes
        const quoteMatches = argStr.match(/"([^"]+)"|'([^']+)'/g);

        if (!quoteMatches || quoteMatches.length < 2) {
          throw new Error(`image tag requires src and alt: {% image "src", "alt" %}`);
        }

        // Remove quotes from matched strings
        const cleanArgs = quoteMatches.map(m => m.replace(/^["']|["']$/g, ''));
        const src = cleanArgs[0];
        const alt = cleanArgs[1];

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

        return Image.generateHTML(metadata, imageAttributes);
      }
    };
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("_posts/**/*.md")
      // Filter out drafts
      .filter((post) => {
        // If frontmatter has an attribute draft and it is explicitly set to true, filter it out
        return !!process.env.SHOW_DRAFTS || post.data.draft !== true
      })
      .filter((post) => {
        return post.data.active !== false;
      })
    ;
  });

  eleventyConfig.addCollection("pinnedPosts", (collection) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return collection.getFilteredByGlob("_posts/**/*.md")
      .filter((post) => {
        const postDate = new Date(post.data.date);
        // Exclude posts from the last 6 months (they'll appear in recentPosts)
        return post.data.pinned === true &&
               post.data.active !== false &&
               postDate < sixMonthsAgo &&
               (!!process.env.SHOW_DRAFTS || post.data.draft !== true);
      });
  });

  eleventyConfig.addCollection("recentPosts", (collection) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return collection.getFilteredByGlob("_posts/**/*.md")
      .filter((post) => {
        const postDate = new Date(post.data.date);
        return postDate >= sixMonthsAgo &&
               post.data.active !== false &&
               (!!process.env.SHOW_DRAFTS || post.data.draft !== true);
      })
      .sort((a, b) => b.data.date - a.data.date);
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
      render: (scope, hash) => {
        // Resolve variables
        const value = liquidEngine.evalValueSync(this.str, scope);
        // Render markdown content
        const content = markdown.render(value);
        // Render the variable as liquid
        return liquidEngine.parseAndRenderSync(
          content,
        );
      },
    };
  });

  eleventyConfig.addLiquidFilter("paginate", (data, currentPage) => {
    const wingSize = 2;
    const wingSpan = wingSize * 2 + 1;
    const totalPages = data.length;

    let firstPage = currentPage - wingSize;
    let lastPage = currentPage + wingSize;

    // If we're early enough in the pager this will slide before 0, so reset
    if (firstPage <= 0) {
      firstPage = 0;
      lastPage = wingSpan;
    }

    // If we're late enough in the pager this will slide past our total, so reset
    if (lastPage >= totalPages - 1) {
      firstPage = totalPages - wingSpan;
      lastPage = totalPages;
    }

    return data
      .map((href, page) => ({ href, page: page + 1 }))
      .slice(firstPage, lastPage + 1);
  });

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
