module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)x?$': [
      'ts-jest',
      {
        tsConfig: {
          allowJs: true,
        },
      },
    ],
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  globals: {
    'ts-jest': {
      // to make type check faster
      isolatedModules: true,
      tsConfig: {
        // to have tsc transform .js files
        allowJs: true,
        checkJs: false,
      },
    },
  },
  transformIgnorePatterns: ['/node_modules/(?!@babylonjs)(.*)'],
};
