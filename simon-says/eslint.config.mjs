import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
