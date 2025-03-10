const { mockModel } = require('./db.mock');
const { list, get, edit, destroy, create } = require('../products');



jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

const { describe } = require('node:test');

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list all products', async () => {
      const products = await list();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });


  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const product = await get('product-id');
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('product-id');


    });
  });




})