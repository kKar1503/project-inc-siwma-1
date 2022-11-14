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
  rules: {
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
  },
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
