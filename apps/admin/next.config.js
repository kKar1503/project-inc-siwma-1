const withTM = require('next-transpile-modules')(['@inc/ui']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});
