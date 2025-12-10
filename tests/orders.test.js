// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('../test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    // load test products into DB
    await productTestHelper.setupTestData();

    // seed the database with some orders so list() has data
    for (let i = 0; i < 5; i++) {
      await create(orderData);
    }
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4); // at least the 5 we seeded
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
      // ensure we have an order to work with even if tests reorder
      if (!createdOrder) {
        createdOrder = await create(orderData);
      }

      const order = await get(createdOrder._id);

      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      if (!createdOrder) {
        createdOrder = await create(orderData);
      }

      const change = { buyerEmail: 'updated@example.com' };

      const updated = await edit(createdOrder._id, change);

      expect(updated).toBeDefined();
      expect(updated.buyerEmail).toBe('updated@example.com');
    });
  });
});
