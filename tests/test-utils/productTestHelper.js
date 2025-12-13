const fs = require('fs/promises');
const { create, destroy } = require('../../products');
const orders = require('../../orders');

const productTestHelper = {
  testProductIds: [],
  testOrderIds: [],

  async setupTestData() {
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const products = JSON.parse(data);

    for (const product of products) {
      if (!product.price) product.price = 10;
      const created = await create(product);
      this.testProductIds.push(created.id);
    }
  },

  async createTestOrders(count) {
    const template = {
      buyerEmail: 'test@example.com',
      buyerName: 'Test User',
      buyerPhone: '555-5555',
      shippingAddress: '123 Test St',
      orderItems: [
        { productId: this.testProductIds[0], quantity: 1 }
      ]
    };

    for (let i = 0; i < count; i++) {
      const order = await orders.create(template);
      this.testOrderIds.push(order._id);
    }
  },

  async cleanupTestData() {
    for (const id of this.testProductIds) {
      await destroy(id);
    }
  }
};

module.exports = productTestHelper;
