// tests/db.mock.js

/**
 * Mock product data returned by our fake DB.
 */
const mockProducts = [
  { description: 'Product 1' },
  { description: 'Product 2' }
];

/**
 * Mock Mongoose-like query object.
 * Supports chainable methods: find().sort().skip().limit().exec()
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
 * Mock Mongoose model.
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  // We'll add findById and deleteOne from tests when needed
};

/**
 * Mock DB object that simulates ../db module.
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
