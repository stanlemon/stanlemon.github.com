const SyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const MarkdownIt = require("markdown-it");

const markdown = new MarkdownIt({ html: true });

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(SyntaxHighlight);

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("_posts/*.md");
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
        const value = liquidEngine.evalValue(this.str, scope);
        // Render markdown content
        const content = markdown.render(value);
        // Render the variable as liquid
        return liquidEngine.parseAndRender(
          content,
          scope.contexts[0],
          scope.opts
        );
      },
    };
  });

  return {
    dir: {
      input: "./", // Equivalent to Jekyll's source property
      output: "./_site", // Equivalent to Jekyll's destination property
    },
  };
};
