// tests/products.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

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
            mockDb.Product.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

            // Call to get the product using the `get` method
            const product = await get('1'); // Assuming '1' is the product id

            // Assertions to verify the result
            expect(product.description).toBe('Product 1');
        });
    });

    describe('destroy', () => {
        it('should delete a product by id', async () => {
            // Mock the Product.deleteOne method to simulate a successful deletion
            mockDb.Product.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            // Call to destroy (delete) the product using the `destroy` method
            const result = await destroy('1'); // Assuming '1' is the product id

            // Assertions to verify the deletion
            expect(result.deletedCount).toBe(1);
        });
    });
});
