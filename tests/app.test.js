// tests/app.test.js
const request = require('supertest');
const app = require('../app.js');

describe('Express server', () => {
  test('GET / returns 200 + { ok: true }', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });

  test('GET /products returns 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('GET /orders returns 200', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});