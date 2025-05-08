const mockQuery = {
    sort: jest.fn().mockReturnThis(),    // Allow sorting
    skip: jest.fn().mockReturnThis(),    // Allow skipping
    limit: jest.fn().mockReturnThis(),   // Allow limiting
    exec: jest.fn().mockResolvedValue([{ description: 'Product 1' }, { description: 'Product 2' }]), // Mocked products
  };

  // Mock Mongoose model
const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),   // Return the mock query object when calling find
    findById: jest.fn().mockResolvedValue({ description: 'Product 1' }),  // Mock single product retrieval by ID
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),  // Mock deletion result
  };

module.exports = {
    mockModel,
    mockQuery,
  };