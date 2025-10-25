/**
 * Pagination filter for creating page number windows
 * @param {Array} data - Array of page data
 * @param {number} currentPage - Current page number (0-indexed)
 * @returns {Array} Array of page objects with href and page number
 */
function paginate(data, currentPage) {
  const wingSize = 2;
  const wingSpan = wingSize * 2 + 1;
  const totalPages = data.length;

  let firstPage = currentPage - wingSize;
  let lastPage = currentPage + wingSize;

  // If we have fewer pages than the wing span, show all pages
  if (totalPages <= wingSpan) {
    firstPage = 0;
    lastPage = totalPages - 1;
  }
  // If we're early enough in the pager this will slide before 0, so reset
  else if (firstPage <= 0) {
    firstPage = 0;
    lastPage = wingSpan - 1;
  }
  // If we're late enough in the pager this will slide past our total, so reset
  else if (lastPage >= totalPages - 1) {
    firstPage = totalPages - wingSpan;
    lastPage = totalPages - 1;
  }

  return data
    .map((href, page) => ({ href, page: page + 1 }))
    .slice(firstPage, lastPage + 1);
}

module.exports = {
  paginate,
};
