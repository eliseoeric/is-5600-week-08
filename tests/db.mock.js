// tests/db.mock.js

/**
 * Mock data returned by the mock database.
 */
const mockProducts = [
  { _id: 'product-1', description: 'Product 1' },
  { _id: 'product-2', description: 'Product 2' },
];

/**
 * Mock Mongoose Query object.
 * This allows Product.find().sort().skip().limit() to work in tests.
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then(resolve) {
    return resolve(mockProducts);
  },
};

/**
 * Mock Mongoose Model.
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
};

/**
 * Mock DB object.
 */
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel),
};

module.exports = {
  mockDb,
  mockProducts,
  mockModel,
  mockQuery,
};