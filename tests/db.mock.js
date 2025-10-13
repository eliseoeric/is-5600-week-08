const mockProducts = [
  { _id: 'p1', description: 'Product 1' },
  { _id: 'p2', description: 'Product 2' }
];

const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then: function (resolve) { resolve(mockProducts); }
};

const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  // we'll attach findById/deleteOne in tests when needed
};

const mockDb = {
  model: jest.fn().mockReturnValue(mockModel)
};

module.exports = { mockDb, mockProducts, mockModel, mockQuery };