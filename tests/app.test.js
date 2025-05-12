const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  test('should return response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
  
  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
  });
  
  // Add similar test for /orders route
});