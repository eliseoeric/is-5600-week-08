// tests/test-utils/productTestHelper.js
const { create } = require('../../products'); // your product.js

/**
 * Create test products before tests
 */
async function setupTestData() {
  console.log('Loading test products...');

  const product1 = await create({
    description: 'Product 1',
    likes: 0,
    urls: { regular: 'reg1.jpg', small: 'sm1.jpg', thumb: 'thumb1.jpg' },
    links: { self: '/p1', html: '/p1/html' },
    user: { id: 'u1', first_name: 'John', username: 'john' },
    tags: [{ title: 'tag1' }],
  });

  const product2 = await create({
    description: 'Product 2',
    likes: 0,
    urls: { regular: 'reg2.jpg', small: 'sm2.jpg', thumb: 'thumb2.jpg' },
    links: { self: '/p2', html: '/p2/html' },
    user: { id: 'u2', first_name: 'Jane', username: 'jane' },
    tags: [{ title: 'tag2' }],
  });

  const createdProducts = [product1, product2];

  console.log('Test products loaded successfully');
  return createdProducts;
}

/**
 * Clean up products after tests
 */
async function cleanupTestData() {
  console.log('Cleaning up test products...');
  const { Product } = require('../../products'); // import Product model
  await Product.deleteMany({});
  console.log('Test products cleaned up successfully');
}

module.exports = {
  setupTestData,
  cleanupTestData,
};
