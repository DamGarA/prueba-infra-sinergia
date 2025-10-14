/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc,d.ts}': [
    'eslint --cache .',
    'eslint --cache . --fix',
    'prettier --write .'
  ]
}
