require('eslint/config');
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: ['commonjs', 'module'],
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      semi: ['error', 'always', { omitLastInOneLineBlock: true }],
      quotes: ['error', 'single'],
    },
  },
];
