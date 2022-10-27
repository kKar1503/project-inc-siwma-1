module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:import/errors', 'plugin:import/warnings', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
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
