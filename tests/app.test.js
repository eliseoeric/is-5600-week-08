const request = require('supertest');
const app = require('../app.js');

describe('Express Server Routes', () => {
  beforeAll(done => done());

  test('should return 200 response for the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('should return 200 response for the /products route', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('should return 200 response for the /orders route', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});
