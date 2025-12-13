const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);
describe('get', () => {
  it('should get a product by id', async () => {
    mockModel.findById = jest
      .fn()
      .mockResolvedValue({ description: 'Product 1' });

    const product = await get('test-id');

    expect(product).toBeDefined();
    expect(product.description).toBe('Product 1');
  });
});
