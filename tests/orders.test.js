const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();

    for (let i = 0; i < 5; i++) {
      createdOrder = await create(orderData);
    }
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
      const newOrder = await create(orderData);

      expect(newOrder).toBeDefined();
      expect(newOrder.buyerEmail).toBe(orderData.buyerEmail);

      createdOrder = newOrder;
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
    it('should edit an order', async () => {
      const change = {
        status: 'COMPLETED'
      };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});