// tests/product.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // your tests go here
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
    // Mock the Product.findById method to return a specific product
    mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

    // call to get the product using the `get` method
    // your assertions
  });
});
mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
// No imports from `node:test`
const { describe, it } = require('node:test');