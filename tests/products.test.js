// tests/products.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

jest.mock('../db', () => mockDb);


describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

//   beforeAll(async () => {
//     await productTestHelper.setupTestData();
//   });

//   afterAll(async () => {
//     await productTestHelper.cleanupTestData();
//   });


    it('should list all products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
    it('should get a product by id', async () => {
        mockDb.model('Product').findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
        const product = await get('abc123');
        expect(product.description).toBe('Product 1');
        expect(mockModel.findById).toHaveBeenCalledWith('abc123');
      });

      it('should delete a product', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
        const deletionResult = await destroy('abc123');
        expect(deletionResult.deletedCount).toBe(1);
        expect(mockModel.deleteOne).toHaveBeenCalledWith({_id: 'abc123'});
      });

});