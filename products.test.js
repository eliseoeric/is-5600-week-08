const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    test('should return products', async () => {
      const res = await list();
      expect(res.length).toBe(2);
    });
  });

  describe('get', () => {
    test('should get product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({
        description: 'Product 1'
      });

      const product = await get('1');
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    test('should delete product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({
        deletedCount: 1
      });

      const result = await destroy('1');
      expect(result.deletedCount).toBe(1);
    });
  });
});