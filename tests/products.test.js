const productTestHelper = require('./test-utils/productTestHelper');
const { list, get } = require('../products');

describe('Product Module', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list all products', async () => {
      const products = await list();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('get', () => {
    it('should retrieve a product by id', async () => {
      const productId = productTestHelper.testProductIds[0]; // Get a product ID from the test setup
      const product = await get(productId);
      expect(product).not.toBeNull();
      expect(product.id).toBe(productId);
    });
  });
});
