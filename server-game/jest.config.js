/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
