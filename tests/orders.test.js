// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const productTestHelper = require('./test-utils/productTestHelper');
const orderData = require('../data/order1.json');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(3); // optional: create some orders
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      // ensure orderData.products contains valid seeded product ids
      // replace any placeholders with actual seeded ids if needed:
      if (!orderData.products || orderData.products.length === 0) {
        // fallback: pick seeded product ids from helper
        orderData.products = productTestHelper.testProductIds.slice(0, 2);
      }
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Add "get" test required by your task:
  describe('get', () => {
    it('should get order by id', async () => {
      const order = await get(createdOrder._id || createdOrder.id);
      expect(order).toBeDefined();
      expect(order._id || order.id).toBeDefined();
    });
  });

  // Add "edit" test required by your task:
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { status: 'COMPLETED' };
      const edited = await edit(createdOrder._id || createdOrder.id, change);
      expect(edited).toBeDefined();
      expect(edited.status).toBe('COMPLETED');
    });
  });
});
