const productTestHelper = require('./test-utils/productTestHelper');
const Orders = require('../orders');

describe('Order Module', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  it('should create and list an order', async () => {
    const [productId] = productTestHelper.testProductIds;
    expect(productId).toBeDefined();

    const order = await Orders.create({
      buyerEmail: 'test-order@example.com',
      products: [productId],
    });

    expect(order).toBeDefined();
    expect(order.buyerEmail).toBe('test-order@example.com');
    expect(order.products.length).toBeGreaterThan(0);

    const orders = await Orders.list({});
    expect(orders.length).toBeGreaterThan(0);

    await Orders.destroy(order._id || order.id);
  });
});
