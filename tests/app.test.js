const request = require('supertest');
const app = require('../app');

describe('App routes', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('GET /products should return 200', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
  });

  test('GET /orders should return 200', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
  });
});