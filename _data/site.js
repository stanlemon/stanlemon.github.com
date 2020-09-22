module.exports = {
    "name": "lemonbytes",
    "title": "lemonbytes by Stan Lemon",
    "author": "Stan Lemon",
    "description": "husband, dad, steelers fan and software engineer",
    "social": {
        "twitter": "stanlemon",
        "github": "stanlemon",
        "linkedin": "stanlemon"
    },
    "google_analytics": "UA-33072694-1",
    // Variables in this list are calculated by calling the function.
    "eleventyComputed": {
        // If an env variable (local dev) has been set, use it, otherwise default (prod)
        "url": () => process.env.SITE_URL ? process.env.SITE_URL : "https://stanlemon.com",
    }
};
