// tests/app.test.js
const request = require('supertest');
const app = require('../app.js');

// Test suite for the Express server
describe('The Express Server', () => {

  // Runs before all tests to ensure clean state
  beforeAll(done => {
    done()
  })

  // Test 1: Check the root route returns 200
  test('should return response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  // Test 2: Check the /products route returns 200
  test('should respond at /products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200);
  });

  // Test 3: Check the /orders route returns 200
  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders')
    expect(res.statusCode).toEqual(200);
  });

}); 