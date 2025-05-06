const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const { create: createProduct } = require('../products');
const productData = require('../data/product1.json');

describe('Orders Module', () => {
  let createdProduct;
  let createdOrder;

  beforeAll(async () => {
    createdProduct = await createProduct(productData);
    orderData.products = [createdProduct._id];

    console.log(orderData);
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(0);
      console.log(orders.length)
    });
  });

  describe('get', () => {
    it('should retrieve an order', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { status: 'COMPLETED' }
      const editedOrder = await edit(createdOrder._id, change)
      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});