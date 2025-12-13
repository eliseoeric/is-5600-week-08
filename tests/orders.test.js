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

  it('lists orders', async () => {
    const orders = await list();
    expect(orders.length).toBeGreaterThan(0);
  });

  it('creates an order', async () => {
    createdOrder = await create(orderData);
    expect(createdOrder).toBeDefined();
  });

  it('gets order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
  });

  it('edits an order', async () => {
    const updated = await edit(createdOrder._id, { buyerName: 'Updated Name' });
    expect(updated.buyerName).toBe('Updated Name');
  });
});
