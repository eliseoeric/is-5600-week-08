const { mockModel } = require('./db.mock');

const { create, get, list, edit, destroy } = require('../products');
const db = require('../db');

jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Product Module', () => {


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
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
      const product = await get('1234');
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toBeCalledWith('1234');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {

    mockModel.deleteOne= jest.fn().mockResolvedValue({ description: 'Product 1' });
      const deletionResult = await destroy('1234');
      expect(deletionResult.description).toBe('Product 1');
      expect(mockModel.deleteOne).toBeCalledWith({ _id: '1234' });
    });
  });

})