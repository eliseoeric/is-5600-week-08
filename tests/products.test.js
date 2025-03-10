// Import the mock model from the mock database
const { mockModel } = require('./db.mock');
// Import functions from the products module
const { list, get, edit, destroy, create } = require('../products');

// Mock the database model using Jest
jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel), // Return the mocked model
}));

// Import the describe function from Node.js testing module
const { describe } = require('node:test');

// Grouping tests for the Product module
describe('Product Module', () => {

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks to avoid interference between tests
  });

  // Grouping tests for the 'list' function
  describe('list', () => {
    it('should list all products', async () => {
      // Call the list function and await the result
      const products = await list();
      // Ensure there are products in the list
      expect(products.length).toBeGreaterThan(0);
      // Validate the descriptions of the first two products
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // Grouping tests for the 'get' function
  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock the findById method to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      // Call the get function with a specific product id and await the result
      const product = await get('product-id');
      // Validate the returned product's description
      expect(product.description).toBe('Product 1');
      // Check if findById was called with the correct product id
      expect(mockModel.findById).toHaveBeenCalledWith('product-id');
    });
  });

});
