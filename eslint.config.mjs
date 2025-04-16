// @ts-check

import eslint from '@eslint/js';
import pluginJs from "@eslint/js";
import tseslint from 'typescript-eslint';
import globals from "globals";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
    pluginJs.configs.recommended,
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginUnicorn.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    eslintPluginPrettierRecommended,
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
          myCustomGlobal: "readonly"
        }
      },
      linterOptions: {
        noInlineConfig: false,
        reportUnusedDisableDirectives: "error"
      },
      rules: {
        "no-unused-expressions": "error",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          { "assertionStyle": "never" }
        ],
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          { "accessibility": "explicit", "overrides": { "constructors": "off" } }
        ],
        "@typescript-eslint/member-ordering": "error",
        "class-methods-use-this": "error",
        "unicorn/better-regex": "warn",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-null": "off",
        "unicorn/number-literal-case": "off",
        "unicorn/numeric-separators-style": "off",
        "unicorn/prevent-abbreviations": [
          "error",
          {
            "allowList": {
              "acc": true,
              "env": true,
              "i": true,
              "j": true,
              "props": true,
              "Props": true
            }
          }
        ],
        "max-lines-per-function": ["error", 50]
      },
    },
    {
      ignores: ["**/webpack.config.js",
        "**/webpack.dev.config.js",
        "**/webpack.prod.config.js",
        "**/eslint.config.mjs",
        "**/.commitlintrc.json",
        "node_modules/**",
        "dist/**",
        "public/**"],
    },
);