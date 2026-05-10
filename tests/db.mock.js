// tests/db.mock.js

// Fake product data to simulate what MongoDB would return
const mockProducts = [
  { description: 'Product 1' },
  { description: 'Product 2' }
];

// Simulate Mongoose's chainable query methods (.sort().skip().limit())
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function(resolve) { resolve(mockProducts) }
};

// Simulate a Mongoose Model with a find() method
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery)
};

// Simulate the db object that the app uses to access MongoDB
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
};

module.exports = { mockDb, mockProducts, mockModel, mockQuery };