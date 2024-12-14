const { mockDb, mockProducts, mockModel } = require('./db.mock');
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

  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock findById to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Mocked Product' });
      const product = await get('some-id');
      expect(mockModel.findById).toHaveBeenCalledWith('some-id');
      expect(product.description).toBe('Mocked Product');
    });
  });
  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock findById to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Mocked Product' });
      const product = await get('some-id');
      expect(mockModel.findById).toHaveBeenCalledWith('some-id');
      expect(product.description).toBe('Mocked Product');
    });
  });

  describe('destroy', () => {
    it('should delete a product by id', async () => {
      // Mock deleteOne to simulate a delete
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('some-id');
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'some-id' });
      expect(result.deletedCount).toBe(1);
    });
  });
});