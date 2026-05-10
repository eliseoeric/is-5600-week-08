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

  describe('list', () => {
    test('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    test('should create order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    test('should get order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  describe('edit', () => {
    test('should edit order', async () => {
      const change = { buyerEmail: 'updated@test.com' };

      const edited = await edit(createdOrder._id, change);

      expect(edited).toBeDefined();
      expect(edited.buyerEmail).toBe('updated@test.com');
    });
  });
});