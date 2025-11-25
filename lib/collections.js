/**
 * Filter posts based on draft and active status
 * @param {Array} posts - Array of post objects
 * @param {Object} options - Filter options
 * @param {boolean} options.showDrafts - Whether to show draft posts
 * @returns {Array} Filtered posts
 */
export function filterPosts(posts, { showDrafts = false } = {}) {
  return posts
    .filter((post) => {
      // If frontmatter has an attribute draft and it is explicitly set to true, filter it out
      return showDrafts || post.data.draft !== true;
    })
    .filter((post) => {
      return post.data.active !== false;
    });
}

/**
 * Filter pinned posts that are older than 6 months
 * @param {Array} posts - Array of post objects
 * @param {Object} options - Filter options
 * @param {boolean} options.showDrafts - Whether to show draft posts
 * @param {Date} options.referenceDate - Reference date for calculating 6 months ago (defaults to now)
 * @returns {Array} Filtered pinned posts
 */
export function filterPinnedPosts(posts, { showDrafts = false, referenceDate = new Date() } = {}) {
  const sixMonthsAgo = new Date(referenceDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return posts.filter((post) => {
    const postDate = new Date(post.data.date);
    // Exclude posts from the last 6 months (they'll appear in recentPosts)
    return (
      post.data.pinned === true &&
      post.data.active !== false &&
      postDate < sixMonthsAgo &&
      (showDrafts || post.data.draft !== true)
    );
  });
}

/**
 * Filter recent posts from the last 6 months and sort by date descending
 * @param {Array} posts - Array of post objects
 * @param {Object} options - Filter options
 * @param {boolean} options.showDrafts - Whether to show draft posts
 * @param {Date} options.referenceDate - Reference date for calculating 6 months ago (defaults to now)
 * @returns {Array} Filtered and sorted recent posts
 */
export function filterRecentPosts(posts, { showDrafts = false, referenceDate = new Date() } = {}) {
  const sixMonthsAgo = new Date(referenceDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return posts
    .filter((post) => {
      const postDate = new Date(post.data.date);
      return (
        postDate >= sixMonthsAgo &&
        post.data.active !== false &&
        (showDrafts || post.data.draft !== true)
      );
    })
    .sort((a, b) => b.data.date - a.data.date);
}


