// tests/app.test.js
const request = require('supertest');
// Important: Instead of requiring the entire app.js, we need to require just the Express app part
const app = require('../app.js');

describe('The Express Server', () => {
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

  test('should respond at /orders', async () => {
    const res = await request(app)
      .get('/orders')
    expect(res.statusCode).toEqual(200);
  });
});