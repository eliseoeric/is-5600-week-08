// tests/products.test.js
const productTestHelper = require('./test-utils/productTestHelper');
const { list, get, destroy } = require('../products');

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

  // get test using in-memory DB data (not mocked)
  describe('get', () => {
    it('should get a product by id', async () => {
      // use one of the seeded product ids from helper
      const id = productTestHelper.testProductIds[0];
      const product = await get(id);
      expect(product).toBeDefined();
      expect(product._id || product.id).toBeDefined();
    });
  });
});
