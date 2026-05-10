// tests/products.test.js
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

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

  // Test: get a single product by ID using a mock
  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
      const product = await get('someId');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // Test: delete a product using a mock
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('someId');
      expect(result.deletedCount).toBe(1);
    });
  });

});