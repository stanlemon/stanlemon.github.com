const { describe, it } = require("node:test");
const assert = require("node:assert");
const { filterPosts, filterPinnedPosts, filterRecentPosts } = require("../lib/collections");

describe("filterPosts", () => {
  it("should filter out draft posts by default", () => {
    const posts = [
      { data: { draft: false, active: true } },
      { data: { draft: true, active: true } },
      { data: { active: true } },
    ];

    const result = filterPosts(posts);

    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].data.draft, false);
    assert.strictEqual(result[1].data.draft, undefined);
  });

  it("should include draft posts when showDrafts is true", () => {
    const posts = [
      { data: { draft: false, active: true } },
      { data: { draft: true, active: true } },
      { data: { active: true } },
    ];

    const result = filterPosts(posts, { showDrafts: true });

    assert.strictEqual(result.length, 3);
  });

  it("should filter out inactive posts", () => {
    const posts = [
      { data: { active: true } },
      { data: { active: false } },
      { data: {} },
    ];

    const result = filterPosts(posts);

    assert.strictEqual(result.length, 2);
    assert.notStrictEqual(result[0].data.active, false);
    assert.notStrictEqual(result[1].data.active, false);
  });

  it("should filter out both draft and inactive posts", () => {
    const posts = [
      { data: { draft: false, active: true } },
      { data: { draft: true, active: true } },
      { data: { draft: false, active: false } },
      { data: { draft: true, active: false } },
      { data: { active: true } },
    ];

    const result = filterPosts(posts);

    assert.strictEqual(result.length, 2);
  });
});

describe("filterPinnedPosts", () => {
  it("should only include pinned posts older than 6 months", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2023-10-01T00:00:00.000Z"), // More than 6 months ago
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2024-01-01T00:00:00.000Z"), // Less than 6 months ago
        },
      },
      {
        data: {
          pinned: false,
          active: true,
          date: new Date("2023-09-01T00:00:00.000Z"), // More than 6 months ago but not pinned
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.date.getUTCMonth(), 9); // October (month index 9)
  });

  it("should exclude draft pinned posts by default", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          draft: true,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          draft: false,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.draft, false);
  });

  it("should include draft pinned posts when showDrafts is true", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          draft: true,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          draft: false,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterPinnedPosts(posts, {
      showDrafts: true,
      referenceDate: now,
    });

    assert.strictEqual(result.length, 2);
  });

  it("should exclude inactive pinned posts", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          pinned: true,
          active: false,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2023-11-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.active, true);
  });

});

describe("filterRecentPosts", () => {
  it("should only include posts from last 6 months", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          active: true,
          date: new Date("2024-01-01T00:00:00.000Z"), // 5 months ago
        },
      },
      {
        data: {
          active: true,
          date: new Date("2023-11-01T00:00:00.000Z"), // 7 months ago
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-05-01T00:00:00.000Z"), // 1 month ago
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 2);
  });

  it("should sort posts by date descending", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          active: true,
          date: new Date("2024-01-15T00:00:00.000Z"),
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-05-15T00:00:00.000Z"),
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-03-15T00:00:00.000Z"),
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0].data.date.getUTCMonth(), 4); // May (month index 4)
    assert.strictEqual(result[1].data.date.getUTCMonth(), 2); // March (month index 2)
    assert.strictEqual(result[2].data.date.getUTCMonth(), 0); // January (month index 0)
  });

  it("should exclude draft posts by default", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          active: true,
          draft: true,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          active: true,
          draft: false,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.draft, false);
  });

  it("should include draft posts when showDrafts is true", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          active: true,
          draft: true,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          active: true,
          draft: false,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterRecentPosts(posts, {
      showDrafts: true,
      referenceDate: now,
    });

    assert.strictEqual(result.length, 2);
  });

  it("should exclude inactive posts", () => {
    const now = new Date("2024-06-01T00:00:00.000Z");
    const posts = [
      {
        data: {
          active: false,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.active, true);
  });
});
