// tests/products.test.js
const { mockDb, mockProducts,mockModel } = require('./db.mock');
const productTestHelper = require('./test-utils/productTestHelper');
const { list,get,destroy } = require('../products');
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  // Set up and clean up test data
  beforeEach(() => {
    jest.clearAllMocks();
    });

  // your tests go here
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
  
      const product = await get('mockProductId');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
  
      const result = await destroy('mockProductId');
      expect(result.deletedCount).toBe(1);
    });
  });
});