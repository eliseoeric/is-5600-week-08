// tests/products.test.js

const { mockDb } = require('./db.mock');

// mock DB before importing products
jest.mock('../db', () => mockDb);
//

const { list } = require('../products');

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
});