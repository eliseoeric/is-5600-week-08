// tests/orders.test.js

const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {

  let createdOrder;

  // Load test data into the in-memory DB
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // ---------------------------
  // TEST 1: list()
  // ---------------------------
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  // ---------------------------
  // TEST 2: create()
  // ---------------------------
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // ---------------------------
  // TEST 3: get()
  // ---------------------------
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
    });
  });

  // ---------------------------
  // TEST 4: edit()
  // ---------------------------
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { status: 'COMPLETED' };
      
      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });

});
