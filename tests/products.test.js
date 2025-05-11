const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeAll(async () => await productTestHelper.setupTestData());
    afterAll(async () => await productTestHelper.cleanupTestData());

    beforeEach(() => jest.clearAllMocks());

    test('should list products', async () => {
        const products = await list();
        expect(products).toHaveLength(2);
        expect(products[0].description).toBe('Product 1');
    });

    test('should get a product by id', async () => {
        mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
        const product = await get('1234');
        expect(product.description).toBe('Product 1');
    });

    test('should delete a product by id', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
        const deletionResult = await destroy('1234');
        expect(deletionResult.deletedCount).toBe(1);
    });
});
