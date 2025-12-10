// tests/orders.test.js
const { create, list, get, edit } = require('../orders');
const productTestHelper = require('./test-utils/productTestHelper');
const orderData = require('../data/order1.json');

describe('Orders Module', () => {

  let createdOrder;

  // SETUP TEST DATA
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  // TEAR DOWN
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  //
  // LIST TEST
  //
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  //
  // CREATE TEST
  //
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  //
  // GET TEST
  //
  describe('get', () => {
    it('should get the created order by id', async () => {
      const order = await get(createdOrder._id);

      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  //
  // EDIT TEST
  //
  describe('edit', () => {
    it('should edit an existing order', async () => {
      const change = { buyerEmail: 'updated@example.com' };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe('updated@example.com');
    });
  });

});
