const withTM = require('next-transpile-modules')(['@inc/ui', '@inc/styles']);

module.exports = withTM({
  reactStrictMode: true,
});
