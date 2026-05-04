const { mockDb, mockModel } = require('./db.mock');

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
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({
        description: 'Product 1',
      });

      const product = await get('123');

      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({
        deletedCount: 1,
      });

      const result = await destroy('123');

      expect(result).toBeDefined();
      expect(result.deletedCount).toBe(1);
    });
  });
});