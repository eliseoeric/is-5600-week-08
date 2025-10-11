const { mockDb, mockModel, fakeProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Replace DB with mock
jest.mock('../db', () => mockDb);

describe('Products Module Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('list()', () => {
    it('returns all mock products', async () => {
      const result = await list();
      expect(result).toHaveLength(2);
      expect(result[0].description).toBe('Mock Product 1');
      expect(result[1].description).toBe('Mock Product 2');
    });
  });

  describe('get()', () => {
    it('fetches a single product by ID', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Mock Product 1' });
      const product = await get('xyz001');
      expect(product).toBeDefined();
      expect(product.description).toEqual('Mock Product 1');
    });
  });

  describe('destroy()', () => {
    it('removes a product successfully', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('xyz001');
      expect(result.deletedCount).toBe(1);
    });
  });
});
