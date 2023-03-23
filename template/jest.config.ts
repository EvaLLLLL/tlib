/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  verbose: true,
  watchman: false,
  collectCoverage: true,
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/']
}
