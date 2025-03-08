const { mockDb, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
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

  // Your Task: Add "get" test to products
  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock the Product.findById method to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      // Call the get method
      const product = await get('mockProductId');

      // Assertions
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // Your Task: Add "destroy" test to products
  describe('destroy', () => {
    it('should delete a product', async () => {
      // Mock the deleteOne method to return a successful deletion
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      // Call the destroy method
      const result = await destroy('mockProductId');

      // Assertions
      expect(result.deletedCount).toBe(1);
    });
  });
});