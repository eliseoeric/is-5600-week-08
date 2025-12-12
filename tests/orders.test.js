// tests/orders.test.js
const productTestHelper = require('./test-utils/productTestHelper');
const Orders = require('../orders.js');
const Products = require('../products.js');
const orderData = require('../data/order1.json');

describe('Orders Module (integration, in-memory Mongo)', () => {
  let createdOrder;
  let productIds = [];

  beforeAll(async () => {
    // seed products using the provided helper
    await productTestHelper.setupTestData();

    // capture ids of a few products for the order payload
    const seeded = await Products.list({ limit: 3, offset: 0 });
    productIds = seeded.slice(0, 2).map(p => p._id);

    // also create some orders for list() to find
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('lists orders (>=5)', async () => {
      const orders = await Orders.list();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('create', () => {
    it('creates an order', async () => {
      const payload = { ...orderData, products: productIds };
      createdOrder = await Orders.create(payload);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
      expect(createdOrder.products.length).toBe(2);
    });
  });

  describe('get', () => {
    it('retrieves an order by id', async () => {
      const got = await Orders.get(createdOrder._id);
      expect(got).toBeDefined();
      expect(`${got._id}`).toBe(`${createdOrder._id}`);
    });
  });

  describe('edit', () => {
    it('updates an order status', async () => {
      const edited = await Orders.edit(createdOrder._id, { status: 'COMPLETED' });
      expect(edited).toBeDefined();
      expect(edited.status).toBe('COMPLETED');
    });
  });
});
const closeDb = require('./test-utils/closeDb');

afterAll(async () => {
  await new Promise(r => setTimeout(r, 25)); // small settle delay
  await closeDb();
});