// tests/db.mock.js

// Fake products that our "database" will return
const mockProducts = [
  { _id: '1', description: 'Product 1' },
  { _id: '2', description: 'Product 2' }
];

// Fake Mongoose-like query object (supports chaining)
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function (resolve) {
    resolve(mockProducts);
  },
};

// Fake Mongoose model
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  // we’ll set these in tests later:
  findById: jest.fn(),
  deleteOne: jest.fn(),
};

// Fake db module that returns our fake model
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel),
};

module.exports = {
  mockDb,
  mockProducts,
  mockModel,
  mockQuery,
};
