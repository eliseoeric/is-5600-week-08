// tests/products.test.js

const { mockDb, mockProducts, mockModel, mockQuery } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Replace "../db" with our mockDb instead of the real mongoose connection
jest.mock('../db', () => mockDb);

describe('Product Module (Mocked DB)', () => {

  beforeEach(() => {
    // Clear mocks before each test to prevent cross-test interference
    jest.clearAllMocks();
  });

  // ---------------------------
  // TEST 1: list()
  // ---------------------------
  describe('list', () => {
    it('should list products', async () => {
      const products = await list();

      // EXPECTED: The mock should return the 2 mockProducts from db.mock.js
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');

      // Verify find() was called
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  // ---------------------------
  // TEST 2: get()
  // ---------------------------
  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock findById() specifically for this test
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const product = await get('123');

      expect(mockModel.findById).toHaveBeenCalledWith('123');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // ---------------------------
  // TEST 3: destroy()
  // ---------------------------
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy('123');

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '123' });
      expect(result.deletedCount).toBe(1);
    });
  });

});
