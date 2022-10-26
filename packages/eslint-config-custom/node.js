module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['import'],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/*.test.js'],
      plugins: ['jest'],
    },
  ],
  ignorePatterns: ['**/*.json', 'node_modules', '.turbo', 'dist'],
};
