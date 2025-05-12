// tests/products.test.js
const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return all products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('get', () => {
    it('should get a product by ID', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ _id: 'abc123', name: 'Test Product' });

      const product = await get('abc123');
      expect(product).toBeDefined();
      expect(product._id).toBe('abc123');
      expect(mockModel.findById).toHaveBeenCalledWith('abc123');
    });
  });

  describe('destroy', () => {
    it('should delete a product by ID', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy('p789');
      expect(result.deletedCount).toBe(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'p789' });
    });
  });
});