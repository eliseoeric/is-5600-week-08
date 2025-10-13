module.exports = {
  preset: '@shelf/jest-mongodb',
  testMatch: ['**/tests/**/*.test.js'],
  clearMocks: true,
  cacheDirectory: '/tmp/jest-cache'
};
