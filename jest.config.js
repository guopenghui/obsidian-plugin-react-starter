/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "jsdom", 
  setupFilesAfterEnv: ['./test/jest-setup.ts'],
  // maxWorkers: 1,
};