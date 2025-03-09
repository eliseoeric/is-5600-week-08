const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {

  let createdProduct;
  let createdOrder;

  // Setup test data before tests
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  // Clean up test data after tests
  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('Create Order', () => {
    it('should create an order successfully', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Get Order by ID
  describe('Get Order', () => {
    it('should return an order by ID', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
      expect(order.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Edit Order
  describe('Edit Order', () => {
    it('should edit an order successfully', async () => {
      const change = { buyerEmail: 'newemail@gmail.com' };
      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });
});
