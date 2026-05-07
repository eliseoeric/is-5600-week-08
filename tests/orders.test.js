// tests/orders.test.js

const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('../test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();

    // Create several orders so the list test has data to read.
    for (let i = 0; i < 5; i++) {
      const order = await create({
        ...orderData,
        buyerEmail: `buyer${i}@example.com`,
        products: [...orderData.products],
      });

      if (i === 0) {
        createdOrder = order;
      }
    }
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();

      expect(orders).toBeDefined();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      const newOrder = await create({
        ...orderData,
        buyerEmail: 'john.doe@example.com',
        products: [...orderData.products],
      });

      expect(newOrder).toBeDefined();
      expect(newOrder.buyerEmail).toBe('john.doe@example.com');
    });
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);

      expect(order).toBeDefined();
      expect(String(order._id)).toBe(String(createdOrder._id));
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const change = {
        status: 'COMPLETED',
      };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});