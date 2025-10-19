require("dotenv").config();

module.exports = () => ({
  name: "Stan Lemon",
  title: "Stan Lemon",
  author: "Stan Lemon",
  description: "husband, dad, steelers fan and software developer",
  social: {
    github: "stanlemon",
    linkedin: "stanlemon",
    instagram: "stanlemon",
    threads: "stanlemon",
  },
  // If an env variable (local dev) has been set, use it, otherwise default (prod)
  url:
    process.env.SITE_URL !== undefined
      ? process.env.SITE_URL
      : "https://stanlemon.com",
  // Google Analytics tracking ID
  googleAnalyticsId: "G-LRTQMGFLV3",
});
