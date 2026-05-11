const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {

  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('get', () => {
    it('should get order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  describe('edit', () => {
    it('should update order', async () => {
      const updated = await edit(createdOrder._id, {
        buyerEmail: 'updated@test.com'
      });

      expect(updated).toBeDefined();
      expect(updated.buyerEmail).toBe('updated@test.com');
    });
  });

});