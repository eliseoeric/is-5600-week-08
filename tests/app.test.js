// tests/app.test.js
const request = require('supertest');
const app = require('../app'); // <-- not a server


describe('The Express Server', () => {
  beforeAll(done => done());

  test('should return response at /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  // TODO (you): add the /orders smoke test
  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});