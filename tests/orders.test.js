jest.setTimeout(30000);

const { create, get, list, edit } = require('../orders');
const orderData = { buyerEmail: 'buyer@example.com', items: [] };
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module (in-memory Mongo)', () => {
  let createdOrder;

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
      expect(String(order._id)).toBe(String(createdOrder._id));
    });
  });

  describe('edit', () => {
    it('should edit an order and persist the change', async () => {
      const change = { buyerEmail: 'edited@example.com' };
      const edited = await edit(createdOrder._id, change);
      expect(edited).toBeDefined();
      expect(edited.buyerEmail).toBe('edited@example.com');
      const reloaded = await get(createdOrder._id);
      expect(reloaded.buyerEmail).toBe('edited@example.com');
    });
  });
});
