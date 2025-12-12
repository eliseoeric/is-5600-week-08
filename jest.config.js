module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testTimeout: 20000,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
