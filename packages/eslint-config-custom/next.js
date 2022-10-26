module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/{ui,charts,notifications}'],
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
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
