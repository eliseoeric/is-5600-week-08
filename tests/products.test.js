// tests/products.test.js
const { mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the database module used in the products module
jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock call data before each test
  });

  describe('list', () => {
    it('should list all products', async () => {
      const products = await list(); // Call the function being tested
      expect(Array.isArray(products)).toBe(true); // Verify the result is an array
      expect(products.length).toBeGreaterThan(0); // Verify the array is not empty
      expect(products[0].description).toBe('Product 1'); // Check the first product's description
      expect(products[1].description).toBe('Product 2'); // Check the second product's description
      expect(mockModel.find).toHaveBeenCalled(); // Ensure the mocked 'find' method was called
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      const product = await get('product-id'); // Call the function being tested
      expect(product.description).toBe('Product 1'); // Verify the product's description
      expect(mockModel.findById).toHaveBeenCalledWith('product-id'); // Ensure findById was called with the correct argument
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      const result = await destroy('product-id'); // Call the function being tested
      expect(result.deletedCount).toBe(1); // Verify that one product was deleted
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'product-id' }); // Ensure deleteOne was called with the correct argument
    });
  });
});