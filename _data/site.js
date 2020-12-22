require("dotenv").config();

module.exports = () => ({
  name: "lemonbytes",
  title: "lemonbytes by Stan Lemon",
  author: "Stan Lemon",
  description: "husband, dad, steelers fan and software engineer",
  social: {
    twitter: "stanlemon",
    github: "stanlemon",
    linkedin: "stanlemon",
  },
  google_analytics: "UA-33072694-1",
  // If an env variable (local dev) has been set, use it, otherwise default (prod)
  url: process.env.SITE_URL ? process.env.SITE_URL : "https://stanlemon.com",
});
