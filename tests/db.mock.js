
const mockProducts = [
    { description: 'Product 1' },
    { description: 'Product 2' }
];


const mockQuery = {
    sort: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    skip: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    limit: jest.fn().mockReturnThis(), // Returns 'this' to allow chaining
    exec: jest.fn().mockResolvedValue(mockProducts),  // Simulates DB query execution
    then: function(resolve) { resolve(mockProducts) }  // Makes the query thenable (Promise-like)
};


const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery)
};


const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
    mockDb,        
    mockProducts, 
    mockModel,     
    mockQuery     
};
