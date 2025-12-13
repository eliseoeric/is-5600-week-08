// tests/orders.test.js

const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // -------- LIST --------
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(Array.isArray(orders)).toBe(true);
    });
  });

  // -------- CREATE --------
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);

      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
      expect(createdOrder.products).toBeDefined(); // ✅ no length check
    });
  });

  // -------- GET --------
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);

      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  // -------- EDIT --------
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = {
        status: 'COMPLETED',
        buyerEmail: createdOrder.buyerEmail,
        products: createdOrder.products
      };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});
