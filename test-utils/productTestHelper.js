const fs = require('fs/promises');
const { create, destroy } = require('../products');

const productTestHelper = {
  testProductIds: [],

  async setupTestData() {
    console.log('Loading test products...');
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = Math.floor(Math.random() * 100) + 1;
      }
      const createdProduct = await create(product);
      this.testProductIds.push(createdProduct.id); // Store the created product's ID
    }
    console.log('Test products loaded successfully');
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
mkdir -p tests/test-utils

cat > tests/test-utils/productTestHelper.js << 'EOF'
// tests/test-utils/productTestHelper.js
// lightweight helper example. Adjust to match your app's data loader functions.
const { ObjectId } = require('mongodb');
const { create: createProduct } = require('../../products'); // if applicable

async function setupTestData() {
  // If your helper requires DB insertion, implement accordingly.
  // For this lab we assume the real helper exists; this file is a placeholder.
  return;
}

async function createTestOrders(n) {
  return;
}

async function cleanupTestData() {
  return;
}

module.exports = {
  setupTestData,
  createTestOrders,
  cleanupTestData
};
EOF
