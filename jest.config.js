module.exports = {
  // Uncomment this when you begin testing w/in-memory database
  // preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
};
cat > jest.config.js << 'EOF'
module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js','**/tests/**/*.spec.js']
};
EOF
