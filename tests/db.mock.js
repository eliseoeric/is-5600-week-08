@@ -0,0 +1,34 @@
// tests/db.mock.js

const mockProducts = [
    { id: '1', description: 'Product 1' },
    { id: '2', description: 'Product 2' }
];

// Mock Mongoose Query object.
const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockProducts),  // Simulates DB query execution
    then: function(resolve) { resolve(mockProducts) }  // Makes the query thenable (Promise-like)
};

// Mock Mongoose Model object.
const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery), // Returns the mock query object so that we can chain methods like sort, skip, limit
    findById: jest.fn()  // Mock findById directly
};

// Mock DB object that simulates the mongoose db interface.
const mockDb = {
    model: jest.fn().mockReturnValue(mockModel),
    findById: jest.fn()  // Mock findById directly here for compatibility
};

module.exports = {
    mockDb,
    mockProducts,
    mockModel,
    mockQuery
};
