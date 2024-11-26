if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL,
);

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secure.gravatar.com"
      },
      {
        protocol: 'https',
        hostname: 'www.sadondeko.com',
      }
    ],
  },
};
