const { describe, it } = require("node:test");
const assert = require("node:assert");
const { parseImageArgs } = require("../lib/image-tag");

describe("parseImageArgs", () => {
  it("should parse double-quoted arguments", () => {
    const result = parseImageArgs('"./assets/image.jpg", "Alt text"');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should parse single-quoted arguments", () => {
    const result = parseImageArgs("'./assets/image.jpg', 'Alt text'");

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should parse mixed quotes", () => {
    const result = parseImageArgs('"./assets/image.jpg", \'Alt text\'');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should handle arguments with extra whitespace", () => {
    const result = parseImageArgs('  "./assets/image.jpg"  ,  "Alt text"  ');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should handle paths with spaces", () => {
    const result = parseImageArgs('"./assets/my image.jpg", "Alt text"');

    assert.strictEqual(result.src, "./assets/my image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should handle alt text with commas and special chars", () => {
    const result = parseImageArgs(
      '"./assets/image.jpg", "Alt text with, commas and & special chars"'
    );

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text with, commas and & special chars");
  });

  it("should throw error when missing arguments", () => {
    assert.throws(
      () => parseImageArgs('"./assets/image.jpg"'),
      /image tag requires src and alt/
    );
  });

  it("should throw error when no arguments provided", () => {
    assert.throws(() => parseImageArgs(""), /image tag requires src and alt/);
  });

  it("should throw error when arguments are not quoted", () => {
    assert.throws(
      () => parseImageArgs("./assets/image.jpg, Alt text"),
      /image tag requires src and alt/
    );
  });

  it("should handle arguments without comma separator", () => {
    const result = parseImageArgs('"./assets/image.jpg" "Alt text"');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
  });

  it("should handle alt text with commas", () => {
    const result = parseImageArgs(
      '"./assets/image.jpg", "Description of image, showing multiple things"'
    );

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(
      result.alt,
      "Description of image, showing multiple things"
    );
  });
});
