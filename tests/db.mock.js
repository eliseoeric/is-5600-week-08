// tests/db.mock.js

/**
 * Mock products returned by fake DB
 */
const mockProducts = [
  { description: 'Product 1' },
  { description: 'Product 2' }
];

/**
 * Mock chainable mongoose query
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function (resolve) {
    resolve(mockProducts);
  }
};

/**
 * Mock model (replaces mongoose.model)
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  findById: jest.fn(),
  deleteOne: jest.fn()
};

/**
 * Mock DB module
 */
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
  mockDb,
  mockProducts,
  mockModel,
  mockQuery
};
