// tests/db.mock.js

/**
 * Mock data simulating documents from MongoDB.
 */
const mockProducts = [
  { _id: 'p1', name: 'Product 1', price: 100, tags: [{ title: 'test' }] },
  { _id: 'p2', name: 'Product 2', price: 200, tags: [{ title: 'sample' }] }
];

const mockOrders = [
  { _id: 'o1', productId: 'p1', quantity: 2 },
  { _id: 'o2', productId: 'p2', quantity: 1 }
];

/**
 * Mock Query object to simulate Mongoose's chainable queries.
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function (resolve) { resolve(mockProducts); }
};

const mockOrderQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockOrders),
  then: function (resolve) { resolve(mockOrders); }
};

/**
 * Mock Mongoose Model with custom handlers for both Product and Order.
 */
const mockProductModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  create: jest.fn().mockImplementation((data) => Promise.resolve({ _id: 'newP', ...data }))
};

const mockOrderModel = {
  find: jest.fn().mockReturnValue(mockOrderQuery),
  create: jest.fn().mockImplementation((data) => Promise.resolve({ _id: 'newO', ...data }))
};

/**
 * Mock DB object returning different models based on name.
 */
const mockDb = {
  model: jest.fn((modelName) => {
    if (modelName === 'Product') return mockProductModel;
    if (modelName === 'Order') return mockOrderModel;
  })
};

module.exports = {
  mockDb,
  mockProducts,
  mockOrders,
  mockProductModel,
  mockOrderModel,
  mockQuery,
  mockOrderQuery
};