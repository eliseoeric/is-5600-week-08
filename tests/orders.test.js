// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder; // ✅ Move it here (top of describe)

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData); // ✅ Assign to outer variable
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
    it('should edit an existing order', async () => {
      const change = { buyerEmail: 'updatedbuyer@example.com' };
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });
});
