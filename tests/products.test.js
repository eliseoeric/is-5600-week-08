// tests/products.test.js

const { mockDb, mockModel } = require('./db.mock');

// Mock the db module before importing products.js
jest.mock('../db', () => mockDb);

const { list, get, destroy } = require('../products');

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
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({
        _id: 'product-1',
        description: 'Product 1',
      });

      const product = await get('product-1');

      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('product-1');
    });
  });

  describe('destroy', () => {
    it('should delete a product by id', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({
        deletedCount: 1,
      });

      const result = await destroy('product-1');

      expect(result).toBeDefined();
      expect(result.deletedCount).toBe(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'product-1' });
    });
  });
});