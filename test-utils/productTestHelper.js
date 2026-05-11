const fs = require('fs/promises');
const { create, destroy } = require('../products');
const { create: createOrder } = require('../orders');
const db = require('../db');

const productTestHelper = {
  testProductIds: [],

  async setupTestData(limit = 10) {
    console.log('Loading test products...');
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data).slice(0, limit);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = Math.floor(Math.random() * 100) + 1;
      }
      const createdProduct = await create(product);
      this.testProductIds.push(createdProduct.id); // Store the created product's ID
    }
    console.log('Test products loaded successfully');
  },

  async createTestOrders(count = 1) {
    console.log(`Creating ${count} test orders...`);
    for (let i = 0; i < count; i += 1) {
      const orderData = {
        buyerEmail: `test.order.${i}@example.com`,
        products: this.testProductIds.slice(0, 2),
        status: 'PENDING'
      };
      await createOrder(orderData);
    }
    console.log('Test orders created successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products and orders...');
    for (const productId of this.testProductIds) {
      await destroy(productId);
    }
    const Order = db.model('Order');
    if (Order) {
      await Order.deleteMany({});
    }
    console.log('Test products and orders cleaned up successfully');
  },
};

module.exports = productTestHelper;
