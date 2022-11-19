const withTM = require('next-transpile-modules')(['@inc/ui', '@inc/charts']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['spoxwyiorgijkrqidutq.supabase.co'],
  },
});
