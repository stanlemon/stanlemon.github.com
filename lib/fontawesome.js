import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONT_AWESOME_SVG_DIR = join(
  __dirname,
  "..",
  "node_modules",
  "@fortawesome",
  "fontawesome-free",
  "svgs"
);

const svgCache = new Map();

export function getFontAwesomeSvg(style, iconName, className = "social-icon") {
  const cacheKey = `${style}/${iconName}/${className}`;

  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  const filePath = join(FONT_AWESOME_SVG_DIR, style, `${iconName}.svg`);

  if (!existsSync(filePath)) {
    throw new Error(`Font Awesome SVG not found: ${style}/${iconName}`);
  }

  const rawSvg = readFileSync(filePath, "utf8");
  const extraAttrs = `class="${className}" aria-hidden="true" focusable="false"`;
  const enhancedSvg = rawSvg.replace("<svg ", `<svg ${extraAttrs} `);

  svgCache.set(cacheKey, enhancedSvg);
  return enhancedSvg;
}

export function registerFontAwesomeShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode("faIcon", function(style, iconName, className = "social-icon") {
    return getFontAwesomeSvg(style, iconName, className);
  });
}
