require("dotenv").config();

const SyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const MarkdownIt = require("markdown-it");

const markdown = new MarkdownIt({ html: true });

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(SyntaxHighlight);

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("_posts/*.md")
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
