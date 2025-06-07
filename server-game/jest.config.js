// module.exports = {
//   setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.ts?$': 'ts-jest',
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testMatch: ['<rootDir>/src/**/*.test.ts'],
//   transformIgnorePatterns: ['/node_modules/(?!@babylonjs)(.*)'],
// };

module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        isolatedModules: true, // to make type check faster
        tsConfig: {
          // to have tsc transform .js files
          allowJs: true,
          checkJs: false,
        },
      },
    ],
    '^.+\\.js$': [
      'ts-jest',
      {
        isolatedModules: true, // to make type check faster
        tsConfig: {
          // to have tsc transform .js files
          allowJs: true,
          checkJs: false,
        },
      },
    ],
  },
  transformIgnorePatterns: [
    /* to have node_modules transformed*/
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
