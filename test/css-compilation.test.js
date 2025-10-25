const { describe, it } = require("node:test");
const assert = require("node:assert");
const path = require("path");
const fs = require("fs");

describe("CSS Compilation", () => {
  it("should have main.11ty.js template file", () => {
    const templatePath = path.join(__dirname, "../css/main.11ty.js");
    assert.ok(fs.existsSync(templatePath), "main.11ty.js should exist");
  });

  it("should have main.less source file", () => {
    const lessPath = path.join(__dirname, "../css/main.less");
    assert.ok(fs.existsSync(lessPath), "main.less should exist");
  });

  it("should export a class with data and render methods", () => {
    const CssTemplate = require("../css/main.11ty.js");
    const instance = new CssTemplate();

    assert.ok(typeof instance.data === "function", "should have data method");
    assert.ok(typeof instance.render === "function", "should have render method");
  });

  it("should configure correct permalink", () => {
    const CssTemplate = require("../css/main.11ty.js");
    const instance = new CssTemplate();
    const data = instance.data();

    assert.strictEqual(data.permalink, "/css/main.css");
    assert.strictEqual(data.eleventyExcludeFromCollections, true);
  });

  it("should render valid CSS output", async () => {
    const CssTemplate = require("../css/main.11ty.js");
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
    const CssTemplate = require("../css/main.11ty.js");
    const instance = new CssTemplate();

    // Should not throw
    await assert.doesNotReject(
      async () => await instance.render(),
      "CSS compilation should not throw errors"
    );
  });

  it("should handle production vs development mode", async () => {
    const originalEnv = process.env.NODE_ENV;

    try {
      // Test production mode
      process.env.NODE_ENV = "production";
      delete require.cache[require.resolve("../css/main.11ty.js")];
      const CssTemplateProd = require("../css/main.11ty.js");
      const prodInstance = new CssTemplateProd();
      const prodCss = await prodInstance.render();

      // Test development mode
      process.env.NODE_ENV = "development";
      delete require.cache[require.resolve("../css/main.11ty.js")];
      const CssTemplateDev = require("../css/main.11ty.js");
      const devInstance = new CssTemplateDev();
      const devCss = await devInstance.render();

      // Production CSS should be compressed (shorter)
      assert.ok(
        prodCss.length <= devCss.length,
        "Production CSS should be same length or compressed"
      );
      assert.ok(prodCss.length > 0, "Production CSS should not be empty");
      assert.ok(devCss.length > 0, "Development CSS should not be empty");
    } finally {
      process.env.NODE_ENV = originalEnv;
      delete require.cache[require.resolve("../css/main.11ty.js")];
    }
  });
});
