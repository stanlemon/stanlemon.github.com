import { describe, it } from "node:test";
import assert from "node:assert";
import configureEleventy from "../eleventy.config.js";

function createMockConfig() {
  const mock = {
    addPluginCalls: [],
    addPassthroughCopyCalls: [],
    addWatchTargetCalls: [],
    addCollectionCalls: [],
    addLiquidTagCalls: [],
    addLiquidFilterCalls: [],
    setFrontMatterParsingOptionsCalls: [],
    setLiquidOptionsCalls: [],
    addShortcodeCalls: [],
  };

  mock.addPlugin = (...args) => mock.addPluginCalls.push(args);
  mock.addPassthroughCopy = (...args) => mock.addPassthroughCopyCalls.push(args);
  mock.addWatchTarget = (...args) => mock.addWatchTargetCalls.push(args);
  mock.addCollection = (...args) => mock.addCollectionCalls.push(args);
  mock.addLiquidTag = (...args) => mock.addLiquidTagCalls.push(args);
  mock.addLiquidFilter = (...args) => mock.addLiquidFilterCalls.push(args);
  mock.setFrontMatterParsingOptions = (...args) => mock.setFrontMatterParsingOptionsCalls.push(args);
  mock.setLiquidOptions = (...args) => mock.setLiquidOptionsCalls.push(args);
  mock.addShortcode = (...args) => mock.addShortcodeCalls.push(args);

  return mock;
}

describe("eleventy.config", () => {
  it("registers core plugins, passthrough copies, and directories", () => {
    const mock = createMockConfig();
    const result = configureEleventy(mock);

    assert.strictEqual(mock.addPluginCalls.length, 1, "SyntaxHighlight plugin should be registered");
    assert.deepStrictEqual(
      mock.addPassthroughCopyCalls.map(([path]) => path),
      ["assets", "robots.txt", "llms.txt"]
    );
    const watchTargets = mock.addWatchTargetCalls
      .map(([target]) => target)
      .sort((a, b) => a.localeCompare(b));
    const expectedWatchTargets = ["./css/*.less", "./css/above-the-fold.css"].sort((a, b) => a.localeCompare(b));
    assert.deepStrictEqual(watchTargets, expectedWatchTargets);
    assert.deepStrictEqual(mock.setFrontMatterParsingOptionsCalls[0][0], {
      excerpt: true,
      excerpt_separator: "<!-- excerpt -->",
    });
    assert.deepStrictEqual(mock.setLiquidOptionsCalls[0][0], { dynamicPartials: false });

    assert.deepStrictEqual(result, {
      dir: { input: "./", output: "./_site" },
    });
  });

  it("wires custom liquid tags, filters, collections, and shortcodes", () => {
    const mock = createMockConfig();
    configureEleventy(mock);

    const tagNames = mock.addLiquidTagCalls.map(([name]) => name);
    assert.deepStrictEqual(tagNames, ["image", "liquidify"]);
    for (const [, handler] of mock.addLiquidTagCalls) {
      assert.strictEqual(typeof handler, "function", "Liquid tag handlers should be functions");
    }

    assert.deepStrictEqual(mock.addLiquidFilterCalls.map(([name]) => name), ["paginate"]);

    const collectionNames = mock.addCollectionCalls
      .map(([name]) => name)
      .sort((a, b) => a.localeCompare(b));
    assert.deepStrictEqual(collectionNames, ["pinnedPosts", "posts", "recentPosts"]);
    for (const [, callback] of mock.addCollectionCalls) {
      assert.strictEqual(typeof callback, "function", "Collection callbacks should be functions");
    }

    const shortcodeNames = mock.addShortcodeCalls
      .map(([name]) => name)
      .sort((a, b) => a.localeCompare(b));
    const expectedShortcodeNames = ["criticalCss", "faIcon"].sort((a, b) => a.localeCompare(b));
    assert.deepStrictEqual(shortcodeNames, expectedShortcodeNames);
  });
});
