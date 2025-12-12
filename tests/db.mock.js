const mockProducts = [
    { description: 'Product 1' },
    { description: 'Product 2' }
  ];
  
  // Mock Mongoose Query Object with chainable methods
  const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockProducts),
    then: function(resolve) { resolve(mockProducts); }
  };
  
  // Mock Mongoose Model Object with required methods
  const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn().mockResolvedValue({ description: 'Product 1' }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
  };
  
  // Mock DB interface
  const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
  };
  
  module.exports = {
    mockDb,
    mockProducts,
    mockModel,
    mockQuery
  };
  