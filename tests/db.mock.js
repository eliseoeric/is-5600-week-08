/**
 * Mock data to be returned by our mock database queries.
 * This simulates the documents we'd typically get from MongoDB.
 */
const mockProducts = [
  { description: 'Product 1' },
  { description: 'Product 2' }
];

/**
 * Mock Mongoose Query object.
 * Simulates Mongoose chainable queries like .find().sort().skip().limit()
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),   // chainable
  skip: jest.fn().mockReturnThis(),   // chainable
  limit: jest.fn().mockReturnThis(),  // chainable
  exec: jest.fn().mockResolvedValue(mockProducts), // resolves like DB query
  then: function(resolve) { resolve(mockProducts) } // makes query thenable
};

/**
 * Mock Mongoose Model object.
 * Simulates Model.find() and other methods
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery)
};

/**
 * Mock DB object.
 * Simulates mongoose db.model('Product')
 */
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
  mockDb,       // mocked db interface
  mockProducts, // mock product data
  mockModel,    // mocked model methods
  mockQuery     // mocked query object
};
