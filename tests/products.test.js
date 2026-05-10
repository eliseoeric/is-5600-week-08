const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // LIST TEST
  describe('list', () => {
    it('should list products', async () => {
      const products = await list();

      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // GET TEST
  describe('get', () => {
    it('should get product by id', async () => {
      mockModel.findById.mockResolvedValue({ description: 'Product 1' });

      const product = await get('1');

      expect(mockModel.findById).toHaveBeenCalled();
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // DESTROY TEST
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await destroy('1');

      expect(mockModel.deleteOne).toHaveBeenCalled();
      expect(result.deletedCount).toBe(1);
    });
  });

});