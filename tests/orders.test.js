const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productHelper = require('../test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productHelper.setupTestData();
    createdOrder = await create(orderData);
  });

  afterAll(async () => {
    await productHelper.cleanupTestData();
  });

  test('create order', async () => {
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  test('list orders', async () => {
    const orders = await list();
    expect(orders.length).toBeGreaterThan(0);
  });

  test('get order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id.toString()).toBe(createdOrder._id.toString());
  });

  test('edit order', async () => {
    const updated = await edit(createdOrder._id, {
      buyerEmail: 'updated@test.com'
    });

    expect(updated).toBeDefined();
    expect(updated.buyerEmail).toBe('updated@test.com');
  });
});