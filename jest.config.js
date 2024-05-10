/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom", 
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFilesAfterEnv: ['./test/jest-setup.ts'],
  setupFiles: ['./jest.polyfills.js'],
  // maxWorkers: 1,
};
