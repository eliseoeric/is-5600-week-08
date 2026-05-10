// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {

  let createdOrder;

  // Load test data into the in-memory database before all tests
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  // Clean up all test data after all tests are done
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // Test: create an order
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Test: list all orders
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  // Test: get a single order by its ID
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  // Test: edit an existing order
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { buyerEmail: 'updated@test.com' };
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe('updated@test.com');
    });
  });

}); 