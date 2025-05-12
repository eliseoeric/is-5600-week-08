const mockProducts = [
  { description: 'Product 1' },
  { description: 'Product 2' }
];

const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
};

const mockModel = {
  find: jest.fn(() => mockQuery),
  findById: jest.fn().mockImplementation(id => ({
    exec: jest.fn().mockResolvedValue(mockProducts.find(p => p._id === id)),
  })),
  deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
};

module.exports = {
  mockProducts,
  mockQuery,
  mockModel,
};
