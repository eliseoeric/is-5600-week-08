const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');

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
});
