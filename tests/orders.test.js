// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  // Populate DB with dummy data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  // Clean up after all tests
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // 1) list test
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  // 2) create test
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // 3) YOUR TASK: get test
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);

      expect(order).toBeDefined();
      expect(String(order._id)).toBe(String(createdOrder._id));
    });
  });

  // 4) YOUR TASK: edit test
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { buyerEmail: 'updated-buyer@example.com' };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe('updated-buyer@example.com');
    });
  });
});
