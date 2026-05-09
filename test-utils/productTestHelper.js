const fs = require('fs/promises');
const { create, destroy } = require('../products');
const { create: createOrder, get: getOrder } = require('../orders');

const productTestHelper = {
  testProductIds: [],
  testOrderIds: [],

  async setupTestData() {
    console.log('Loading test products...');
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = Math.floor(Math.random() * 100) + 1;
      }
      const createdProduct = await create(product);
      this.testProductIds.push(createdProduct._id); // Store the created product's ID
    }
    console.log('Test products loaded successfully');
  },

  async createTestOrders(count) {
    console.log(`Creating ${count} test orders...`);
    for (let i = 0; i < count; i++) {
      const orderData = {
        buyerEmail: `test${i}@example.com`,
        products: [this.testProductIds[0]],
        status: 'CREATED'
      };
      const createdOrder = await createOrder(orderData);
      this.testOrderIds.push(createdOrder._id);
    }
    console.log('Test orders created successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');
    for (const productId of this.testProductIds) {
      await destroy(productId);
    }
    console.log('Test products cleaned up successfully');
  },
};

module.exports = productTestHelper;
