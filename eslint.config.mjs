// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  ...tailwindPlugin.configs['flat/recommended'],
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPluginRecommended, // prettier 플러그인은 맨뒤에

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [tseslint.configs.disableTypeChecked], // js파일 타입체크 x
    ignores: ['**/*.config.js', '!**/eslint.config.js'],
    plugins: {
      react: reactPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
    rules: {
      ...reactPlugin.configs['recommended'].rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
  },
);
