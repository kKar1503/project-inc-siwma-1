const withTM = require('next-transpile-modules')(['@inc/ui']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
        pathname: '/80/80/people',
      },
    ],
  },
});
