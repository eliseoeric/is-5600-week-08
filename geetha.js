// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('The Express server', () => {
  test('responds at /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('responds at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  // 👉 add THIS:
  test('responds at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});
