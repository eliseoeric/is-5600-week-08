const mockProducts = [
    { _id: '1', description: 'Product 1' },
    { _id: '2', description: 'Product 2' }
];

const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockProducts),
    then(resolve) { resolve(mockProducts); }
};

const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn().mockImplementation((id) => 
        Promise.resolve(mockProducts.find(p => p._id === id) || null)
    ),
    deleteOne: jest.fn().mockImplementation(({ _id }) => 
        Promise.resolve({ deletedCount: mockProducts.some(p => p._id === _id) ? 1 : 0 })
    ),
    create: jest.fn().mockImplementation((newProduct) => {
        mockProducts.push(newProduct);
        return Promise.resolve(newProduct);
    })
};

const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
    mockDb, mockProducts, mockModel, mockQuery
};