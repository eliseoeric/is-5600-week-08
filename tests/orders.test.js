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

  test('should create an order', async () => {
    createdOrder = await create(orderData);
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  test('should list orders', async () => {
    const orders = await list();
    expect(orders.length).toBeGreaterThan(0);
  });

  test('should get an order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id).toBe(createdOrder._id);
  });

  test('should edit an order', async () => {
    const change = { buyerEmail: 'newemail@example.com' };
    const editedOrder = await edit(createdOrder._id, change);
    expect(editedOrder).toBeDefined();
    expect(editedOrder.buyerEmail).toBe('newemail@example.com');
  });
});
