const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      const fakeId = 'abc123';
      const fakeProduct = { _id: fakeId, description: 'Product 1' };

      mockModel.findById = jest.fn().mockResolvedValue(fakeProduct);

      const product = await get(fakeId);

      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      const fakeId = 'abc123';

      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy(fakeId);

      expect(result.deletedCount).toBe(1);
    });
  });
});
