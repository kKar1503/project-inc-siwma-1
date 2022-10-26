module.exports = {
  env: {
    node: true,
  },
  rules: {
    'no-console': 2,
    quotes: ['error', 'double'],
  },
  overrides: [
    {
      files: ['**/*.random.js'],
      rules: {
        'no-console': 0,
        quotes: ['error', 'single'],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js'],
};
