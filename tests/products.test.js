const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lists products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
  });

  it('gets product by id', async () => {
    mockModel.findById.mockResolvedValue({ description: 'Product 1' });
    const product = await get('abc123');
    expect(product.description).toBe('Product 1');
  });

  it('deletes product', async () => {
    mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await destroy('abc123');
    expect(result.deletedCount).toBe(1);
  });
});
