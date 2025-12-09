// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => require('./db.mock').mockDb);

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

    // TODO: Task 1 - Add 'get' test
    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ 
                description: 'Product 1',
                _id: '123' 
            });

            const product = await get('123');
            expect(product).toBeDefined();
            expect(product.description).toBe('Product 1');
        });
    });

    // TODO: Task 2 - Add 'destroy' test
    describe('destroy', () => {
        it('should delete a product', async () => {
            // Mock the deleteOne method
            mockModel.deleteOne = jest.fn().mockResolvedValue({ 
                deletedCount: 1 
            });

            const result = await destroy('123');
            expect(result).toBeDefined();
            expect(result.deletedCount).toBe(1);
        });
    });
});