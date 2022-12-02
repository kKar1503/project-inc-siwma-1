const withTM = require('next-transpile-modules')(['@inc/ui', '@inc/styles']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'source.unsplash.com',
      'rvndpcxlgtqfvrxhahnm.supabase.co',
    ],
  },
});
