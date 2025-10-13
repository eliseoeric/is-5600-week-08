const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Replace ../db with our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module (mocked)', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // TASK: Add "get" test to products
  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ _id: 'p1', description: 'Product 1' });
      const product = await get('p1');
      expect(mockModel.findById).toHaveBeenCalledWith('p1');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // TASK: Add "destroy" test to products
  describe('destroy', () => {
    it('should delete a product by id', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('p1');
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'p1' });
      expect(result.deletedCount).toBe(1);
    });
  });
});