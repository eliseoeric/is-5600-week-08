// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Use our mocked db instead of the real one
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------- list ----------
  describe('list', () => {
    it('should list products', async () => {
      const products = await list();

      // Just assert on the behavior / data
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // ---------- get ----------
  describe('get', () => {
    it('should get a product by id', async () => {
      const id = 'abc123';

      // Mock Product.findById to return a specific product
      mockModel.findById = jest
        .fn()
        .mockResolvedValue({ _id: id, description: 'Product 1' });

      const product = await get(id);

      expect(mockModel.findById).toHaveBeenCalledWith(id);
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // ---------- destroy ----------
  describe('destroy', () => {
    it('should delete a product', async () => {
      const id = 'abc123';

      // Mock Product.deleteOne to simulate a successful delete
      mockModel.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount: 1 });

      const result = await destroy(id);

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result.deletedCount).toBe(1);
    });
  });
});
