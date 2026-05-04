const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('list products', async () => {
    const products = await list();

    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
  });

  test('get product by id', async () => {
    mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

    const product = await get('123');

    expect(product).toBeDefined();
    expect(product.description).toBe('Product 1');
  });

  test('delete product', async () => {
    mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

    const result = await destroy('123');

    expect(result.deletedCount).toBe(1);
  });
});