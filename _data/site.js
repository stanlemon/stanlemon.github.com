require("dotenv").config();

module.exports = () => {
  const envSiteUrl = process.env.SITE_URL;
  const siteUrl = envSiteUrl && envSiteUrl.trim().length > 0 ? envSiteUrl : "https://stanlemon.com";

  return {
    name: "Stan Lemon",
    title: "Stan Lemon",
    author: "Stan Lemon",
    description: "husband, dad, steelers fan and software developer",
    social: {
      github: "stanlemon",
      linkedin: "stanlemon",
      instagram: "stanlemon",
      threads: "stanlemon",
      youtube: "@stanlemon",
    },
    // Always return a fully-qualified canonical base URL
    url: siteUrl,
    // Google Analytics tracking ID
    googleAnalyticsId: "G-LRTQMGFLV3",
  };
};
