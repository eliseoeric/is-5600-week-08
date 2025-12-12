// tests/orders.test.js

const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  /**
   * Load required test data before running tests
   */
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  }, 20000);

  /**
   * Clean up test data after all tests finish
   * (mongoose is closed globally in tests/setup.js)
   */
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const editedOrder = await edit(createdOrder._id, {
        buyerEmail: 'updated@example.com'
      });

      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe('updated@example.com');
    });
  });
});
