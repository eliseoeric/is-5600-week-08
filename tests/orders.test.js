// tests/orders.test.js

const { create, get, list, edit } = require('../orders'); // your business logic functions
const orderData = require('../data/order1.json'); // sample test order data
const productTestHelper = require('./test-utils/productTestHelper'); // helpers to mock setup/teardown

describe('Orders Module', () => {
  let createdOrder;

  // Insert dummy products and orders before tests
  beforeAll(async () => {
    await productTestHelper.setupTestData();        // Insert test products
    await productTestHelper.createTestOrders(5);    // Insert test orders
  });

  // Clean up test data after all tests
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list existing orders', async () => {
      const orders = await list();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('create', () => {
    it('should create a new order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    it('should return a specific order by ID', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
    });
  });

  describe('edit', () => {
    it('should update an order\'s status', async () => {
      const change = { status: 'COMPLETED' };
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe(change.status);
    });
  });
});