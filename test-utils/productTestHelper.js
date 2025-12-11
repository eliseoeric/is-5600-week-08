const fs = require('fs/promises');
const { create:createProduct, destroy } = require('../products');
const { create: createOrder } = require('../orders');
const { createTestOrders } = require('../tests/test-utils/productTestHelper');


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
      const createdProduct = await createProduct(product);
      this.testProductIds.push(createdProduct.id); // Store the created product's ID
    }
    console.log('Test products loaded successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');
    for (const productId of this.testProductIds) {
      await destroy(productId);
    }

    console.log('Cleaning up test orders...');
    for (const orderId of this.testOrderIds) {
      await destroy(orderId);
    }

    console.log('Test products and orders cleaned up successfully');
  },
  async createTestOrder() {
    if (this.testProductIds.length === 0) {
      throw new Error('No test products available. Run setupTestData() fi ');
    }
    const numProducts = Math.floor(Math.random() * 10) + 1;
    const products = [];

    for( let i=0;i<numProducts; i++) {
      const randomIndex = Math.floor(Math.random() * this.testProductIds.length);
      products.push(this.testProductIds[randomIndex]);
    }

    const orderData = {
      buyerEmail: `test${Date.now()}@example.com`,

      products,
    };

    const createOrder = await createOrder(orderData);
    this.testOrderIds.push(createOrder.id);
    return createOrder;
  },

  async createTestOrders(count = 5) {
    const orders = [];
    for( let i=0; i<count;i++) {
      const order = await this.createTestOrder();
      orders.push(order);
    }
    return orders;

  },
};

module.exports = productTestHelper;
