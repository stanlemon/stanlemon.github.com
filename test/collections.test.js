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
    const now = new Date(2024, 5, 1); // June 1, 2024
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          date: new Date(2023, 9, 1), // October 1, 2023 - More than 6 months ago
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          date: new Date(2024, 0, 1), // January 1, 2024 - Less than 6 months ago
        },
      },
      {
        data: {
          pinned: false,
          active: true,
          date: new Date(2023, 8, 1), // September 1, 2023 - More than 6 months ago but not pinned
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.date.getMonth(), 9); // October (month index 9)
  });

  it("should exclude draft pinned posts by default", () => {
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          draft: true,
          date: new Date("2023-11-01"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          draft: false,
          date: new Date("2023-11-01"),
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.draft, false);
  });

  it("should include draft pinned posts when showDrafts is true", () => {
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          draft: true,
          date: new Date("2023-11-01"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          draft: false,
          date: new Date("2023-11-01"),
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
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          pinned: true,
          active: false,
          date: new Date("2023-11-01"),
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2023-11-01"),
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.active, true);
  });

  it("should only include pinned posts older than 6 months, not at boundary", () => {
    const now = new Date("2024-06-15T12:00:00.000Z");
    const posts = [
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2023-12-10T12:00:00.000Z"), // Just over 6 months old
        },
      },
      {
        data: {
          pinned: true,
          active: true,
          date: new Date("2023-11-01T12:00:00.000Z"), // Clearly over 6 months old
        },
      },
    ];

    const result = filterPinnedPosts(posts, { referenceDate: now });

    // Posts clearly older than 6 months should be included
    assert.strictEqual(result.length, 2);
  });
});

describe("filterRecentPosts", () => {
  it("should only include posts from last 6 months", () => {
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          active: true,
          date: new Date("2024-01-01"), // 5 months ago
        },
      },
      {
        data: {
          active: true,
          date: new Date("2023-11-01"), // 7 months ago
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-05-01"), // 1 month ago
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 2);
  });

  it("should sort posts by date descending", () => {
    const now = new Date(2024, 5, 1); // June 1, 2024
    const posts = [
      {
        data: {
          active: true,
          date: new Date(2024, 0, 15), // January 15, 2024
        },
      },
      {
        data: {
          active: true,
          date: new Date(2024, 4, 15), // May 15, 2024
        },
      },
      {
        data: {
          active: true,
          date: new Date(2024, 2, 15), // March 15, 2024
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0].data.date.getMonth(), 4); // May (month index 4)
    assert.strictEqual(result[1].data.date.getMonth(), 2); // March (month index 2)
    assert.strictEqual(result[2].data.date.getMonth(), 0); // January (month index 0)
  });

  it("should exclude draft posts by default", () => {
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          active: true,
          draft: true,
          date: new Date("2024-05-01"),
        },
      },
      {
        data: {
          active: true,
          draft: false,
          date: new Date("2024-05-01"),
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.draft, false);
  });

  it("should include draft posts when showDrafts is true", () => {
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          active: true,
          draft: true,
          date: new Date("2024-05-01"),
        },
      },
      {
        data: {
          active: true,
          draft: false,
          date: new Date("2024-05-01"),
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
    const now = new Date("2024-06-01");
    const posts = [
      {
        data: {
          active: false,
          date: new Date("2024-05-01"),
        },
      },
      {
        data: {
          active: true,
          date: new Date("2024-05-01"),
        },
      },
    ];

    const result = filterRecentPosts(posts, { referenceDate: now });

    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].data.active, true);
  });
});
