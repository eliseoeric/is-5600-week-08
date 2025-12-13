const { mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module
jest.mock('../db', () => require('./db.mock').mockDb);

describe('Product Module', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById.mockResolvedValue({ description: 'Product 1' });
      const product = await get('abc123');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('abc123');
      expect(result.deletedCount).toBe(1);
    });
  });
});
