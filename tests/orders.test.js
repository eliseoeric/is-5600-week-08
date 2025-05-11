const { create, get, edit, list } = require('../orders');
const productTestHelper = require('./test-utils/productTestHelper');

let createdOrder;

beforeAll(async () => {
  await productTestHelper.setupTestData();
  createdOrder = await create({ buyerEmail: 'test@example.com', products: ['prod1'], status: 'CREATED' });
});

afterAll(async () => {
  await productTestHelper.cleanupTestData();
});

beforeEach(() => { jest.clearAllMocks(); });

describe('Orders Module', () => {
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order.buyerEmail).toBe('test@example.com');
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { status: 'COMPLETED' };
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});