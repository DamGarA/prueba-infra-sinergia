/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}': ['eslint --cache .', 'prettier --write .']
}
