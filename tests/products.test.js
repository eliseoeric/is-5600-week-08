// tests/products.test.js
const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Replace the real '../db' module with our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // LIST
  describe('list', () => {
    it('should list products', async () => {
      const products = await list();

      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // GET
  describe('get', () => {
    it('should get a product by id', async () => {
      const fakeId = 'abc123';

      // Mock the Product.findById method to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({
        _id: fakeId,
        description: 'Product 1',
      });

      const product = await get(fakeId);

      expect(mockModel.findById).toHaveBeenCalledTimes(1);
      expect(mockModel.findById).toHaveBeenCalledWith(fakeId);
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // DESTROY
  describe('destroy', () => {
    it('should delete a product by id', async () => {
      const fakeId = 'abc123';

      // Mock deleteOne to simulate a successful delete
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy(fakeId);

      expect(mockModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: fakeId });
      expect(result.deletedCount).toBe(1);
    });
  });
});
