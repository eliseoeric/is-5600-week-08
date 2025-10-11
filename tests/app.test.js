const request = require('supertest');
const app = require('../app.js');

describe('Express App Integration Tests', () => {
  beforeAll(done => done());

  it('responds successfully to root route "/"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('responds successfully to /products endpoint', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
  });

  it('responds successfully to /orders endpoint', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
  });
});
