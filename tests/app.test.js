// tests/app.test.js
const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  // Simple hook so Jest is happy if we later add async setup
  beforeAll(done => {
    done();
  });

  test('should return response at /', async () => {
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
