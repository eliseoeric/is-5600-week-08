// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Replace the real ../db module with our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. list()
  describe('list', () => {
    it('should list products', async () => {
      const products = await list();

      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
      expect(mockDb.model).toHaveBeenCalled();
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  // 2. get()
  describe('get', () => {
    it('should get a product by id', async () => {
      // mock Product.findById
      mockModel.findById = jest
        .fn()
        .mockResolvedValue({ description: 'Product 1' });

      const id = 'some-id';
      const product = await get(id);

      expect(mockModel.findById).toHaveBeenCalledWith(id);
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // 3. destroy()
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount: 1 });

      const id = 'some-id';
      const result = await destroy(id);

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result.deletedCount).toBe(1);
    });
  });
});
