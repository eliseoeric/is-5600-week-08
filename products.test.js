const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module (Mocked)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });

  it('should get a product by id', async () => {
    mockModel.findById.mockResolvedValue({ description: 'Product 1' });

    const product = await get('test-id');

    expect(product).toBeDefined();
    expect(product.description).toBe('Product 1');
  });

  it('should delete a product', async () => {
    mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await destroy('test-id');

    expect(result.deletedCount).toBe(1);
  });

});
