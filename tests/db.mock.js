/**
 * Mock configuration for simulating Mongoose models in tests
 */
const fakeProducts = [
  { description: 'Mock Product 1' },
  { description: 'Mock Product 2' }
];

const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(fakeProducts),
  then: function (resolve) { resolve(fakeProducts); }
};

const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  findById: jest.fn(),
  deleteOne: jest.fn()
};

const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
  mockDb,
  mockModel,
  mockQuery,
  fakeProducts
};
