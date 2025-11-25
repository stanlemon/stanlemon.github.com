import { describe, it } from "node:test";
import assert from "node:assert";
import CssTemplate from "../css/main.11ty.js";

describe("CSS Compilation", () => {
  it("should export a class with data and render methods", () => {
    const instance = new CssTemplate();

    assert.ok(typeof instance.data === "function", "should have data method");
    assert.ok(typeof instance.render === "function", "should have render method");
  });

  it("should configure correct permalink", () => {
    const instance = new CssTemplate();
    const data = instance.data();

    assert.strictEqual(data.permalink, "/css/main.css");
    assert.strictEqual(data.eleventyExcludeFromCollections, true);
  });

  it("should render valid CSS output", async () => {
    const instance = new CssTemplate();
    const css = await instance.render();

    assert.ok(typeof css === "string", "should return a string");
    assert.ok(css.length > 0, "should return non-empty CSS");
    // Check for some expected CSS patterns
    assert.ok(
      css.includes("body") || css.includes("html"),
      "should contain body or html styles"
    );
  });

  it("should compile without errors", async () => {
    const instance = new CssTemplate();

    // Should not throw
    await assert.doesNotReject(
      async () => await instance.render(),
      "CSS compilation should not throw errors"
    );
  });
});
