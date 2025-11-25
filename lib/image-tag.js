/**
 * Parse image tag arguments from a Liquid tag string
 * @param {string} argStr - The raw argument string from the tag
 * @returns {Object} Object with src, alt, and optional className properties
 * @throws {Error} If required arguments are missing
 */
export function parseImageArgs(argStr) {
  const trimmed = argStr.trim();

  // Match quoted strings - extract content between quotes
  const quoteMatches = trimmed.match(/"([^"]+)"|'([^']+)'/g);

  if (!quoteMatches || quoteMatches.length < 2) {
    throw new Error(`image tag requires src and alt: {% image "src", "alt" %}`);
  }

  // Remove quotes from matched strings
  const cleanArgs = quoteMatches.map((match) => match.substring(1, match.length - 1));
  const src = cleanArgs[0];
  const alt = cleanArgs[1];
  const className = cleanArgs[2]; // Optional third parameter
  const optionsRaw = cleanArgs[3];

  let options;
  if (optionsRaw) {
    try {
      const parsed = JSON.parse(optionsRaw);
      if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object") {
        throw new Error("Options must be a JSON object");
      }
      options = parsed;
    } catch (error) {
      throw new Error(`image tag options must be valid JSON: ${error.message}`);
    }
  }

  return { src, alt, className, options };
}

