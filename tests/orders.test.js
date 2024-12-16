const productTestHelper = require('./test-utils/productTestHelper');
const { create: createOrder, get: getOrder } = require('../orders');

describe('Order Module', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const order = await productTestHelper.createTestOrder();
      expect(order).not.toBeNull();
      expect(order.products.length).toBeGreaterThan(0);
    });
  });

  describe('get', () => {
    it('should retrieve an order by id', async () => {
      const order = await productTestHelper.createTestOrder();
      const fetchedOrder = await getOrder(order.id);
      expect(fetchedOrder).not.toBeNull();
      expect(fetchedOrder.id).toBe(order.id);
    });
  });
});
