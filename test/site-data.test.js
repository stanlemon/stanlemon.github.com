import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import loadSiteData from "../_data/site.js";

const DEFAULT_URL = "https://stanlemon.com";

describe("site data", () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.SITE_URL;
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.SITE_URL;
    } else {
      process.env.SITE_URL = originalEnv;
    }
  });

  it("falls back to default URL when SITE_URL is missing", () => {
    delete process.env.SITE_URL;
    const data = loadSiteData();

    assert.strictEqual(data.url, DEFAULT_URL);
  });

  it("ignores blank SITE_URL values", () => {
    process.env.SITE_URL = "   \t\n   ";
    const data = loadSiteData();

    assert.strictEqual(data.url, DEFAULT_URL);
  });

  it("uses the provided SITE_URL when set", () => {
    process.env.SITE_URL = "https://example.com/blog";
    const data = loadSiteData();

    assert.strictEqual(data.url, "https://example.com/blog");
  });
});
