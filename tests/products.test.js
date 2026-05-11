// tests/products.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    let mockModel;
    
    beforeEach(() => {
        jest.clearAllMocks();
        // Get reference to the mocked model
        mockModel = mockDb.model();
    });

    describe('list', () => {
        it('should list products', async () => {
            const products = await list();
            expect(products.length).toBe(2);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
    });

    // TASK 3: Add "get" test to products
    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1', _id: '123' });

            // Call the get method
            const product = await get('123');
            
            // Assertions
            expect(product).toBeDefined();
            expect(product.description).toBe('Product 1');
        });
    });

    // TASK 4: Add "destroy" test to products
    describe('destroy', () => {
        it('should delete a product', async () => {
            // Mock the deleteOne method
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            // Call the destroy method
            const result = await destroy('123');
            
            // Assertions - verify that the deletedCount is correct
            expect(result.deletedCount).toBe(1);
        });
    });
});