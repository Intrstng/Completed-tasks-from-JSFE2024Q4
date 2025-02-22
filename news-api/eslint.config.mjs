// @ts-check

import eslint from '@eslint/js';
import pluginJs from "@eslint/js";
import tseslint from 'typescript-eslint';
import globals from "globals";
import prettier from 'prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    pluginJs.configs.recommended,
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
      files: ["**/*.ts"],
      languageOptions: {
        ecmaVersion: 2020,
            sourceType: "module",
            globals: {
              ...globals.browser,
              ...globals.node,
              myCustomGlobal: "readonly"
        }
      },
      rules: {
        // indent: ["error", 2],
        // "no-unused-vars": "warn",
        // "no-undef": "warn",
        "no-debugger": "off",
        "no-console": "off",
        "class-methods-use-this": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      ignores: ["**/webpack.config.js",
        "**/webpack.dev.config.js",
        "**/webpack.prod.config.js",
        "**/eslint.config.mjs",
        "node_modules/**",
        "dist/**"],
    },
);