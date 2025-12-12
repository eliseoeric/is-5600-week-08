const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module (Integration)', () => {

  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  it('should list orders', async () => {
    const orders = await list();
    expect(orders.length).toBeGreaterThan(0);
  });

  it('should create an order', async () => {
    createdOrder = await create(orderData);
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  it('should get an order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id.toString()).toBe(createdOrder._id.toString());
  });

  it('should edit an order', async () => {
    const updated = await edit(createdOrder._id, { status: 'shipped' });
    expect(updated).toBeDefined();
    expect(updated.status).toBe('shipped');
  });

});
