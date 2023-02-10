/* eslint-disable @typescript-eslint/no-var-requires */
const tsJestPreset = require('ts-jest/presets');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.d.ts'],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json',
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    ...tsJestPreset.defaults.transform,
  },
  verbose: true,
};
