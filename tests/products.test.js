// tests/products.test.js
const { mockDb, mockModel } = require('./db.mock');

// IMPORTANT: mock must be declared before requiring ../products
jest.mock('../db', () => mockDb);

const { list, get, destroy } = require('../products');

describe('Product Module (mocked db.js)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('returns products from the mocked chain', async () => {
      const products = await list();

      // assert methods used during list()
      expect(mockModel.find).toHaveBeenCalled();
      // sort/skip/limit are chainable; they are called on the returned query object in products.js
      // We don't check mockDb.model() here because it was called at module load and then cleared.

      expect(products).toHaveLength(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('get', () => {
    it('gets a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const p = await get('p1');

      expect(mockModel.findById).toHaveBeenCalledWith('p1');
      expect(p.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('deletes by id via deleteOne', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const res = await destroy('p1');

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'p1' });
      expect(res).toEqual({ deletedCount: 1 });
    });
  });
});