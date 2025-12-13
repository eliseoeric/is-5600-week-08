// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should list products', async () => {
            const products = await list();
            expect(products.length).toBe(2);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
    });

    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

            // call to get the product using the `get` method
            const product = await get('test-id');
            
            // your assertions
            expect(product).toBeDefined();
            expect(product.description).toBe('Product 1');
            expect(mockModel.findById).toHaveBeenCalledWith('test-id');
        });
    });

    describe('destroy', () => {
        it('should delete a product', async () => {
            // Mock the deleteOne method to return a successful deletion
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            // call the destroy method
            const result = await destroy('test-id');

            // assertions to verify that the deleteCount is correct
            expect(result).toBeDefined();
            expect(result.deletedCount).toBe(1);
            expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'test-id' });
        });
    });
});

