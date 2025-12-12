const request = require('supertest');
const app = require('../app');

describe('Express App Routes', () => {

  it('should return 200 for root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return 200 for /products route', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
  });

  it('should return 200 for /orders route', async () => {
    const response = await request(app).get('/orders');
    expect(response.statusCode).toBe(200);
  });

});
