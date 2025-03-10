const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');
const mockModel = require('../models/Product'); // Ensure this is properly imported

jest.mock('../models/Product', () => ({
  findById: jest.fn(),
}));

describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    }); // ✅ Missing closing bracket was added
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      // Mock the findById method
      const mockOrder = { _id: '12345', description: 'Product 1' };
      mockModel.findById.mockResolvedValue(mockOrder);

      const order = await get('12345'); // ✅ Ensure we call the `get` function
      expect(order).toBeDefined();
      expect(order.description).toBe('Product 1');
    });
  });
});

