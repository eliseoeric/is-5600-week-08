const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');



// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);


describe('Product Module', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // beforeAll(async () => {
    //     console.log("Cleaning up test data before inserting...");
    //     await productTestHelper.cleanupTestData();
    //     await productTestHelper.setupTestData();
    // });

    // afterAll(async () => {
    //     console.log("Final cleanup...");
    //     await productTestHelper.cleanupTestData();
    // });

    it('should list all products', async () => {

        const products = await list();
        console.log("Products retrieved:", products); // Debugging log

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBe(2);
        expect(products[0].description).toBe('Product 1');
        expect(products[1].description).toBe('Product 2');
    });

    it('should get a product by id', async () => {
        mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

        const product = await get('1234');

        expect(product.description).toBe('Product 1');
        expect(mockModel.findById).toHaveBeenCalledWith('1234');

    });

    it('should delete a product by id', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

        const deletionResult = await destroy('1234');

        expect(deletionResult.deletedCount).toBe(1);
        expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '1234' });

    });
});