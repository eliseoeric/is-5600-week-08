const request = require('supertest');
const app = require('../app.js'); // Ensure the correct path to app.js

describe('The Express Server', () => {
  test('should return response from home route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
  });
});
