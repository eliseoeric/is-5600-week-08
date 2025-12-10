// tests/db.mock.js

/**
 * Mock data to be returned by our mock database queries.
 * This simulates the documents we'd typically get from MongoDB.
 */
const mockProducts = [
  { _id: 'id1', description: 'Product 1' },
  { _id: 'id2', description: 'Product 2' },
];

/**
 * Mock Mongoose Query object.
 * This simulates Mongoose's chainable query interface.
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),   // chainable
  skip: jest.fn().mockReturnThis(),   // chainable
  limit: jest.fn().mockReturnThis(),  // chainable
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function (resolve) {
    resolve(mockProducts);
  },
};

/**
 * Mock Mongoose Model object.
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  // findById and deleteOne will be added/overridden in tests
};

/**
 * Mock DB object that simulates the mongoose db interface.
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
