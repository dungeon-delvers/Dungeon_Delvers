// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier,{
  ignores: ['node_modules', '**/node_modules', '**/dist', '**/*.config.js'],
});
