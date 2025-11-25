import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { getFontAwesomeSvg, registerFontAwesomeShortcodes } from "../lib/fontawesome.js";

describe("FontAwesome helper", () => {
  it("should return svg markup with default class and accessibility attrs", () => {
    const svg = getFontAwesomeSvg("brands", "github");

    assert.match(svg, /<svg[^>]*class="social-icon"/);
    assert.match(svg, /aria-hidden="true"/);
    assert.match(svg, /focusable="false"/);
    assert.match(svg, /<path[^>]+>/);
  });

  it("should apply custom class names", () => {
    const svg = getFontAwesomeSvg("brands", "linkedin", "custom-class");

    assert.match(svg, /class="custom-class"/);
  });

  it("should throw when svg is missing", () => {
    assert.throws(
      () => getFontAwesomeSvg("brands", "non-existent-icon"),
      /Font Awesome SVG not found/
    );
  });

  it("should register shortcode that renders svg", () => {
    const addShortcode = mock.fn();
    const eleventyConfig = { addShortcode };

    registerFontAwesomeShortcodes(eleventyConfig);

    assert.strictEqual(addShortcode.mock.callCount(), 1);
    const shortcodeFn = addShortcode.mock.calls[0].arguments[1];
    const svg = shortcodeFn("brands", "threads");

    assert.match(svg, /<svg/);
  });
});
