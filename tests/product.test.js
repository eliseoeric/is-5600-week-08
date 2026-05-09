// tests/product.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // replace your current list test with this below:
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
            // your assertions
            const product = mockModel.findById();
            expect(product.description).toBe("Product 1");
        });
    });

    describe('destroy', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            // call to get the product using the `get` method
            // your assertions
            const product = mockModel.deleteOne();
            expect(product.deletedCount).toBe(1);
        });
    });
});


