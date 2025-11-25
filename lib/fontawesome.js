const fs = require("node:fs");
const path = require("node:path");

const FONT_AWESOME_SVG_DIR = path.join(
  __dirname,
  "..",
  "node_modules",
  "@fortawesome",
  "fontawesome-free",
  "svgs"
);

const svgCache = new Map();

function getFontAwesomeSvg(style, iconName, className = "social-icon") {
  const cacheKey = `${style}/${iconName}/${className}`;

  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  const filePath = path.join(FONT_AWESOME_SVG_DIR, style, `${iconName}.svg`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Font Awesome SVG not found: ${style}/${iconName}`);
  }

  const rawSvg = fs.readFileSync(filePath, "utf8");
  const extraAttrs = `class="${className}" aria-hidden="true" focusable="false"`;
  const enhancedSvg = rawSvg.replace("<svg ", `<svg ${extraAttrs} `);

  svgCache.set(cacheKey, enhancedSvg);
  return enhancedSvg;
}

function registerFontAwesomeShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode("faIcon", function(style, iconName, className = "social-icon") {
    return getFontAwesomeSvg(style, iconName, className);
  });
}

module.exports = {
  registerFontAwesomeShortcodes,
  getFontAwesomeSvg,
};
