const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mocking the db module
jest.mock('../db', () => mockDb);

describe('Product Operations', () => {

  describe('List Products', () => {
    it('should return a list of products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('Get Product by ID', () => {
    it('should return the product when found', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
      const product = await get('someProductId');

      expect(mockModel.findById).toHaveBeenCalledWith('someProductId');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });

    it('should return null if the product is not found', async () => {
      mockModel.findById = jest.fn().mockResolvedValue(null);
      const product = await get('unknownProductId');

      expect(mockModel.findById).toHaveBeenCalledWith('unknownProductId');
      expect(product).toBeNull();
    });
  });

  describe('Delete Product', () => {
    it('should delete a product by ID', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('someProductId');

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'someProductId' });
      expect(result.deletedCount).toBe(1);
    });

    it('should return deletedCount 0 if the product does not exist', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
      const result = await destroy('unknownProductId');

      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'unknownProductId' });
      expect(result.deletedCount).toBe(0);
    });
  });

});
