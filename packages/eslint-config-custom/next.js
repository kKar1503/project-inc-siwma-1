module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next', 'airbnb', 'plugin:import/errors', 'plugin:import/warnings', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    JSX: true,
  },
  plugins: ['import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/{ui,charts,notifications}'],
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/button-has-type': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'object-curly-newline': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'react/no-array-index-key': 'off',
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/*.test.js'],
      plugins: ['jest'],
    },
    {
      env: {
        'cypress/globals': true,
      },
      files: ['**/*.cy.js'],
      plugins: ['cypress'],
    },
  ],
  ignorePatterns: ['**/*.json', 'node_modules', '.turbo', '.next', 'public'],
};
