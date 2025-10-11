// jest.config.js
module.exports = {
  preset: '@shelf/jest-mongodb',  // ✅ enabled for in-memory DB
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
};


