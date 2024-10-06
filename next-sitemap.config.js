module.exports = {
    siteUrl: 'https://sadondeko.com',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://sadondeko.com/server-sitemap.xml',
      ],
    }
  };