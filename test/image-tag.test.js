import { describe, it } from "node:test";
import assert from "node:assert";
import { parseImageArgs } from "../lib/image-tag.js";

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

  it("should parse optional className parameter", () => {
    const result = parseImageArgs('"./assets/image.jpg", "Alt text", "my-class"');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
    assert.strictEqual(result.className, "my-class");
  });

  it("should parse optional JSON options", () => {
    const args = `"./assets/image.jpg", "Alt text", "my-class", '{"loading":"eager","fetchpriority":"high"}'`;
    const result = parseImageArgs(args);

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
    assert.strictEqual(result.className, "my-class");
    assert.deepStrictEqual(result.options, { loading: "eager", fetchpriority: "high" });
  });

  it("should throw when options JSON is invalid", () => {
    const args = `"./assets/image.jpg", "Alt text", "my-class", '{invalid'`;
    assert.throws(
      () => parseImageArgs(args),
      /image tag options must be valid JSON/
    );
  });

  it("should throw when options JSON is not an object", () => {
    const args = `"./assets/image.jpg", "Alt text", "my-class", '[1,2,3]'`;
    assert.throws(
      () => parseImageArgs(args),
      /Options must be a JSON object/
    );
  });

  it("should handle className with single quotes", () => {
    const result = parseImageArgs("'./assets/image.jpg', 'Alt text', 'my-class'");

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
    assert.strictEqual(result.className, "my-class");
  });

  it("should handle className with multiple CSS classes", () => {
    const result = parseImageArgs('"./assets/image.jpg", "Alt text", "class1 class2 class3"');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
    assert.strictEqual(result.className, "class1 class2 class3");
  });

  it("should return undefined className when not provided", () => {
    const result = parseImageArgs('"./assets/image.jpg", "Alt text"');

    assert.strictEqual(result.src, "./assets/image.jpg");
    assert.strictEqual(result.alt, "Alt text");
    assert.strictEqual(result.className, undefined);
  });
});
