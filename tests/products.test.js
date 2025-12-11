const { mockDb, mockProducts, mockModel } = require('./db.mock');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

const { list, get } = require('../products');

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
      const expectedProduct = { description: 'Product 1' };
      mockModel.findById = jest.fn().mockResolvedValue(expectedProduct);

      const product = await get('abc123');

      expect(mockModel.findById).toHaveBeenCalledWith('abc123');
      expect(product).toEqual(expectedProduct);
      expect(product.description).toBe('Product 1');
    });
  });
});
