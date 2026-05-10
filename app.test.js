const request = require('supertest');
const app = require('../app');

describe('Server', () => {
  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('/products should return 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  test('/orders should return 200', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});