const { mockDb, mockProducts, mockModel } = require('./db.mock');

// Move this line AFTER requiring mocks
jest.mock('../db', () => mockDb);

const { list, get, destroy } = require('../products');

describe('Products Module Tests', () => {
    test('Should list products', async () => {
        const products = await list();
        expect(products.length).toBe(2);
        expect(products[0].description).toBe('Product 1');
        expect(products[1].description).toBe('Product 2');
    });

    test('Should get a product by ID', async () => {
        mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
        const product = await get('someProductId');
        expect(mockModel.findById).toHaveBeenCalledWith('someProductId');
        expect(product).toBeDefined();
        expect(product.description).toBe('Product 1');
    });

    test('Should return null if product not found', async () => {
        mockModel.findById = jest.fn().mockResolvedValue(null);
        const product = await get('unknownProductId');
        expect(mockModel.findById).toHaveBeenCalledWith('unknownProductId');
        expect(product).toBeNull();
    });

    test('Should delete a product by ID', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
        const result = await destroy('someProductId');
        expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'someProductId' });
        expect(result.deletedCount).toBe(1);
    });

    test('Should return deletedCount 0 if product does not exist', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
        const result = await destroy('unknownProductId');
        expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'unknownProductId' });
        expect(result.deletedCount).toBe(0);
    });
});