
const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');

describe('get', () => {
  it('should get a product by id', async () => {
    jest.resetModules();
    const mockModel = {};
    jest.doMock('../db', () => ({ model: () => mockModel }));
    const { get } = require('../products');
    mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
    const product = await get('some-id');
    expect(product).toBeDefined();
    expect(product.description).toBe('Product 1');
    jest.dontMock('../db');
  });
});

describe('destroy', () => {
  it('should delete a product by id', async () => {
    jest.resetModules();
    const mockModel = {};
    jest.doMock('../db', () => ({ model: () => mockModel }));
    const { destroy } = require('../products');
    mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
    const result = await destroy('some-id');
    expect(result.deletedCount).toBe(1);
    jest.dontMock('../db');
  });
});

describe('list', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  it('should list products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });

  it('should list all products', async () => {
    const products = await list();
    expect(products.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });
});
