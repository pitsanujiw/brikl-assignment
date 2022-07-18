module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.test.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  globalSetup: '../global-setup.js',
}
