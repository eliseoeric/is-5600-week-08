const fs = require('fs/promises');
const { create: createProduct, destroy } = require('../../products');

const productTestHelper = {
  testProductIds: [],

  async setupTestData() {
    this.testProductIds = [];
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
      await destroy(productId);
    }
    this.testProductIds = [];
    console.log('Test products cleaned up successfully');
  },
};

module.exports = productTestHelper;
