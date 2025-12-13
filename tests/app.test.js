const request = require('supertest');
const app = require('../app');

describe('Express Server', () => {
  test('responds at root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('responds at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('responds at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});
