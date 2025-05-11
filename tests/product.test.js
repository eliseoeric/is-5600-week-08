const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

beforeEach(() => { jest.clearAllMocks(); });

describe('Products Module', () => {
  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById.mockResolvedValue({ description: 'Product 1' });
      const product = await get('some-id');
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('some-id');
      expect(result.deletedCount).toBe(1);
    });
  });
});