const { describe, it } = require("node:test");
const assert = require("node:assert");
const { paginate } = require("../lib/filters");

describe("paginate filter", () => {
  it("should return correct pages for first page", () => {
    const pages = ["/page/1", "/page/2", "/page/3", "/page/4", "/page/5", "/page/6", "/page/7"];
    const result = paginate(pages, 0);

    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0].page, 1);
    assert.strictEqual(result[0].href, "/page/1");
    assert.strictEqual(result[4].page, 5);
    assert.strictEqual(result[4].href, "/page/5");
  });

  it("should return correct pages for middle page", () => {
    const pages = ["/page/1", "/page/2", "/page/3", "/page/4", "/page/5", "/page/6", "/page/7"];
    const result = paginate(pages, 3);

    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0].page, 2);
    assert.strictEqual(result[0].href, "/page/2");
    assert.strictEqual(result[2].page, 4);
    assert.strictEqual(result[2].href, "/page/4");
    assert.strictEqual(result[4].page, 6);
    assert.strictEqual(result[4].href, "/page/6");
  });

  it("should return correct pages for last page", () => {
    const pages = ["/page/1", "/page/2", "/page/3", "/page/4", "/page/5", "/page/6", "/page/7"];
    const result = paginate(pages, 6);

    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0].page, 3);
    assert.strictEqual(result[0].href, "/page/3");
    assert.strictEqual(result[4].page, 7);
    assert.strictEqual(result[4].href, "/page/7");
  });

  it("should handle small number of pages", () => {
    const pages = ["/page/1", "/page/2", "/page/3"];
    const result = paginate(pages, 1);

    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0].page, 1);
    assert.strictEqual(result[2].page, 3);
  });

  it("should handle single page", () => {
    const pages = ["/page/1"];
    const result = paginate(pages, 0);

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].page, 1);
    assert.strictEqual(result[0].href, "/page/1");
  });

  it("should handle exactly 5 pages", () => {
    const pages = ["/page/1", "/page/2", "/page/3", "/page/4", "/page/5"];
    const result = paginate(pages, 2);

    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0].page, 1);
    assert.strictEqual(result[4].page, 5);
  });

  it("should create correct page numbers (1-indexed)", () => {
    const pages = ["/a", "/b", "/c"];
    const result = paginate(pages, 0);

    // Pages should be 1-indexed, not 0-indexed
    assert.strictEqual(result[0].page, 1);
    assert.strictEqual(result[1].page, 2);
    assert.strictEqual(result[2].page, 3);
  });
});
