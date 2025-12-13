cat > tests/products.test.js << 'EOF'
// tests/products.test.js
const productTestHelper = require('./test-utils/productTestHelper');
const { mockDb, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products'); // adjust exports as in your repo

jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeAll(async () => { await productTestHelper.setupTestData(); });
  afterAll(async () => { await productTestHelper.cleanupTestData(); });
  beforeEach(() => { jest.clearAllMocks(); });

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
      const product = await get('p1');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('p1');
      // adapt to how your destroy returns; example checks deletedCount
      expect(result.deletedCount || result).toBeDefined();
    });
  });
});
EOF
