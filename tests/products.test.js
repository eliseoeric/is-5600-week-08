// tests/products.test.js
const { setupTestData, cleanupTestData } = require('./test-utils/productTestHelper');
const { list, get, destroy } = require('../products'); // your functions

let createdProducts = [];

beforeAll(async () => {
  createdProducts = await setupTestData(); // <- store returned products
});

afterAll(async () => {
  await cleanupTestData();
});

describe('Products Module Integration Tests', () => {

  test('should list all products', async () => {
    const products = await list();
    expect(products.length).toBeGreaterThanOrEqual(2);
  });

  test('should get a product by id', async () => {
    const productId = createdProducts[0]._id;
    const product = await get(productId);
    expect(product).toBeDefined();
    expect(product._id.toString()).toBe(productId.toString());
  });

  test('should delete a product', async () => {
    const productId = createdProducts[0]._id;
    const result = await destroy(productId);
    expect(result.deletedCount).toBe(1);

    const product = await get(productId);
    expect(product).toBeNull();
  });

});
