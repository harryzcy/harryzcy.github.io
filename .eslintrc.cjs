/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    printWidth: 80
  },
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname
  }
}
