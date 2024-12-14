// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const { create: createProduct } = require('../products');
const productData = require('../data/product1.json');

describe('Orders Module', () => {
  let createdProduct;
  let createdOrder;

  // Populate the database with dummy data
  beforeAll(async () => {
    // Create a product and capture it
    createdProduct = await createProduct(productData);
    // Use the product id and pass it to the order data product id array;
    orderData.products = [createdProduct._id];
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
    });
  });

  describe('edit', () => {
    it('should update an order by id', async () => {
      const change = {buyerEmail: 'ztejd@example.com'}
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });
})