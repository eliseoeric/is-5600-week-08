const { create, get, list, edit } = require('../orders');
const orderSeed = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Integration Suite', () => {
  let savedOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create()', () => {
    it('creates a new order in database', async () => {
      savedOrder = await create(orderSeed);
      expect(savedOrder).toBeDefined();
      expect(savedOrder.buyerEmail).toEqual(orderSeed.buyerEmail);
    });
  });

  describe('list()', () => {
    it('retrieves all existing orders', async () => {
      const orders = await list();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe('get()', () => {
    it('gets order by ID', async () => {
      const result = await get(savedOrder._id);
      expect(result).toBeDefined();
      expect(result._id.toString()).toBe(savedOrder._id.toString());
    });
  });

  describe('edit()', () => {
    it('updates order fields correctly', async () => {
      const updates = { buyerEmail: 'changeduser@example.com' };
      const modified = await edit(savedOrder._id, updates);
      expect(modified).toBeDefined();
      expect(modified.buyerEmail).toEqual('changeduser@example.com');
    });
  });
});
