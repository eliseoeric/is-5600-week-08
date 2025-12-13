const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  beforeAll(done => {
    done()
  })

  test('should return response', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });
});
// tests/app.test.js
describe('The Express Server', () => {
  beforeAll(done => {
    done()
  })

  test('should return response', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);

  });

  test('should respond at /products', async () => {
    const res = await request(app)
      .get('/products')
    expect(res.statusCode).toEqual(200);
  });
});
const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');

describe('Product Module', () => {
  // Set up and clean up test data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // your tests go here
});
describe('list', () => {
  it('should list all products', async () => {
    const products = await list();
    expect(products.length).toBeGreaterThan(0);
  });
});

describe('get', () => {
  it('should retrieve a product by id', async () => {
    // Assume there is a product with id 'abc123'
    const product = await get('abc123');
    expect(product).not.toBeNull();
  });
});
 describe('destroy', () => {
  it('should delete a product', async () => {
    // Assume there is a product with id 'abc123'
    await destroy('abc123');
    const product = await get('abc123');
    expect(product).toBeNull();
  });
});
