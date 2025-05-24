module.exports = {
  siteUrl: "https://www.mothrbox.xyz", // Replace with your live URL
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 7000, // Split large sitemaps into multiple files
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
