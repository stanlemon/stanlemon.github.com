import dotenv from "dotenv";
import SyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import MarkdownIt from "markdown-it";
import Image from "@11ty/eleventy-img";
import { parseImageArgs } from "./lib/image-tag.js";
import { filterPosts, filterPinnedPosts, filterRecentPosts } from "./lib/collections.js";
import { paginate } from "./lib/filters.js";
import { registerFontAwesomeShortcodes } from "./lib/fontawesome.js";

dotenv.config();

const markdown = new MarkdownIt({ html: true });

export default function configureEleventy(eleventyConfig) {
  eleventyConfig.addPlugin(SyntaxHighlight);

  registerFontAwesomeShortcodes(eleventyConfig);

  eleventyConfig.addLiquidTag("image", (liquidEngine) => {
    return {
      parse(tagToken) {
        this.args = tagToken.args;
      },
      async render() {
        const { src, alt, className, options } = parseImageArgs(this.args);

        const metadata = await Image(src, {
          widths: [300, 600, 1200],
          formats: ["webp", "jpeg"],
          outputDir: "./_site/img/",
          urlPath: "/img/",
        });

        const allowedOptionKeys = ["loading", "decoding", "fetchpriority", "sizes"];
        const sanitizedOptions = {};

        if (options) {
          for (const key of allowedOptionKeys) {
            if (options[key]) {
              sanitizedOptions[key] = options[key];
            }
          }
        }

        const imageAttributes = {
          alt,
          sizes: "100vw",
          loading: "lazy",
          decoding: "async",
          ...sanitizedOptions,
        };

        if (imageAttributes.loading === "eager" && !imageAttributes.fetchpriority) {
          imageAttributes.fetchpriority = "high";
        }

        if (className) {
          imageAttributes.class = className;
        }

        return Image.generateHTML(metadata, imageAttributes);
      },
    };
  });

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  eleventyConfig.addWatchTarget("./css/*.less");

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

  eleventyConfig.addLiquidTag("liquidify", (liquidEngine) => {
    return {
      parse(tagToken) {
        this.str = tagToken.args;
      },
      async render(scope) {
        const value = liquidEngine.evalValueSync(this.str, scope);
        const liquidRendered = await liquidEngine.parseAndRender(value, scope);
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
      input: "./",
      output: "./_site",
    },
  };
}
