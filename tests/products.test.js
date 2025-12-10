// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock db module so all calls use mockDb instead of real mongoose
jest.mock('../db', () => mockDb);

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //
  // LIST TEST
  //
  describe('list', () => {
    it('should list mocked products', async () => {
      const products = await list();

      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  //
  // GET TEST
  //
  describe('get', () => {
    it('should get a product by id (mocked)', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({
        description: 'Product 1'
      });

      const product = await get('abc123');

      expect(mockModel.findById).toHaveBeenCalledWith('abc123');
      expect(product.description).toBe('Product 1');
    });
  });

  //
  // DESTROY TEST
  //
  describe('destroy', () => {
    it('should delete a product (mocked)', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy('xyz789');

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'xyz789' });
      expect(result.deletedCount).toBe(1);
    });
  });

});
