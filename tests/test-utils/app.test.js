const request = require('supertest');
const app = require('../../app');

describe('Express App', () => {
  it('should respond to GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('should respond to /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  it('should respond to /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });
});
