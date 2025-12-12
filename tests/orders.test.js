const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('../test-utils/productTestHelper');

let createdOrder;

describe('Orders Module', () => {

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
    });
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const update = { buyerEmail: 'updated@example.com' };
      const editedOrder = await edit(createdOrder._id, update);
      expect(editedOrder.buyerEmail).toBe(update.buyerEmail);
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });
});
