const fs = require('fs/promises');
const { create: createProduct, destroy: destroyProduct, deleteAll: deleteAllProducts } = require('../../products');
const { create: createOrder, destroy: destroyOrder, deleteAll: deleteAllOrders } = require('../../orders');

const productTestHelper = {
  testProductIds: [],
  testOrderIds: [],

  async setupTestData() {
    console.log('Loading test products...');

    // Step 1: Clear all existing test products and orders
    await this.cleanupTestData();

    // Step 2: Load and insert test products
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = Math.floor(Math.random() * 100) + 1; // Assign random price
      }
      const createdProduct = await createProduct(product);
      this.testProductIds.push(createdProduct.id);
    }

    console.log('Test products loaded successfully');
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');

    // Ensure all products and orders are deleted
    try {
      await deleteAllProducts(); // Deletes all products from the database
    } catch (error) {
      console.error('Error cleaning up products:', error);
    }

    this.testProductIds = []; // Reset stored product IDs

    console.log('Cleaning up test orders...');
    try {
      await deleteAllOrders(); // Deletes all orders from the database
    } catch (error) {
      console.error('Error cleaning up orders:', error);
    }

    this.testOrderIds = []; // Reset stored order IDs

    console.log('Test products and orders cleaned up successfully');
  },

  async createTestOrder() {
    if (this.testProductIds.length === 0) {
      throw new Error('No test products available. Run setupTestData() first.');
    }

    const numProducts = Math.floor(Math.random() * 10) + 1;
    const products = [];

    for (let i = 0; i < numProducts; i++) {
      const randomIndex = Math.floor(Math.random() * this.testProductIds.length);
      products.push(this.testProductIds[randomIndex]);
    }

    const orderData = {
      buyerEmail: `test${Date.now()}@example.com`,
      products,
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
  },
};

module.exports = productTestHelper;
