require("dotenv").config();

module.exports = () => ({
  name: "lemonbytes",
  title: "lemonbytes by Stan Lemon",
  author: "Stan Lemon",
  description: "husband, dad, steelers fan and software developer",
  social: {
    twitter: "stanlemon",
    github: "stanlemon",
    linkedin: "stanlemon",
  },
  // If an env variable (local dev) has been set, use it, otherwise default (prod)
  url:
    process.env.SITE_URL !== undefined
      ? process.env.SITE_URL
      : "https://stanlemon.com",
});
