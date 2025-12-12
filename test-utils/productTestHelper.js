// test-utils/productTestHelper.js
const fs = require('fs/promises');
const { create: createProduct, destroy: destroyProduct } = require('../products');
const { create: createOrder, destroy: destroyOrder } = require('../orders');

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
      this.testProductIds.push(createdProduct.id);
    }
    console.log('Test products loaded successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');
    for (const productId of this.testProductIds) {
      try {
        await destroyProduct(productId);
      } catch (err) { }
    }

    console.log('Cleaning up test orders...');
    for (const orderId of this.testOrderIds) {
      try {
        await destroyOrder(orderId);
      } catch (err) { }
    }

    console.log('Test products and orders cleaned up successfully');
  },

  async createTestOrder() {
    if (this.testProductIds.length === 0) {
      throw new Error('No products found. Run setupTestData() first.');
    }

    const numProducts = Math.floor(Math.random() * 5) + 1;
    const products = [];

    for (let i = 0; i < numProducts; i++) {
      const randomIndex = Math.floor(Math.random() * this.testProductIds.length);
      products.push(this.testProductIds[randomIndex]);
    }

    const orderData = {
      buyerEmail: `test-${Date.now()}@example.com`,
      products
    };

    const createdOrder = await createOrder(orderData);
    this.testOrderIds.push(createdOrder.id);
    return createdOrder;
  },

  async createTestOrders(count = 5) {
    const orders = [];
    for (let i = 0; i < count; i++) {
      const order = await this.createTestOrder();
      orders.push(order);
    }
    return orders;
  }
};

module.exports = productTestHelper;
