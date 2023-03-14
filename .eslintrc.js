module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/no-use-before-define': 0
  }
}
