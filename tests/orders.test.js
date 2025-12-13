// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
 
  let createdProduct;
  let createdOrder;

  // Populate the database with dummy data
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
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      // Get the order using the createdOrder._id
      const order = await get(createdOrder._id);
      
      // Assert that the returned order is defined
      expect(order).toBeDefined();
      
      // Assert that the returned order id matches
      expect(order._id).toBe(createdOrder._id);
      expect(order.buyerEmail).toBe(createdOrder.buyerEmail);
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      // Implement the change - let's change the status
      const change = { status: 'COMPLETED' };
      
      // Call the edit method
      const editedOrder = await edit(createdOrder._id, change);
      
      // Assert that the editedOrder exists/is defined
      expect(editedOrder).toBeDefined();
      
      // Assert that the change exists on the new editedOrder object
      expect(editedOrder.status).toBe('COMPLETED');
      expect(editedOrder._id).toBe(createdOrder._id);
    });
  });
});

