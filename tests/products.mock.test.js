jest.mock('../models/ProductModel', () => require('./db.mock').mockModel);

const { list } = require('../products');

describe('Product Module with Mocks', () => {
  test('should list products using mock', async () => {
    const products = await list();
    expect(products).toEqual(expect.arrayContaining([
      expect.objectContaining({ description: 'Product 1' })
    ]));
  });
});
