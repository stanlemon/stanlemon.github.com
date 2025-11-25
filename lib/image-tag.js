/**
 * Parse image tag arguments from a Liquid tag string
 * @param {string} argStr - The raw argument string from the tag
 * @returns {Object} Object with src, alt, and optional className properties
 * @throws {Error} If required arguments are missing
 */
function parseImageArgs(argStr) {
  const trimmed = argStr.trim();

  // Match quoted strings - extract content between quotes
  const quoteMatches = trimmed.match(/"([^"]+)"|'([^']+)'/g);

  if (!quoteMatches || quoteMatches.length < 2) {
    throw new Error(`image tag requires src and alt: {% image "src", "alt" %}`);
  }

  // Remove quotes from matched strings
  const cleanArgs = quoteMatches.map((m) => m.replace(/^["']|["']$/g, ""));
  const src = cleanArgs[0];
  const alt = cleanArgs[1];
  const className = cleanArgs[2]; // Optional third parameter

  return { src, alt, className };
}

module.exports = {
  parseImageArgs,
};
