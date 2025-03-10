const request = require('supertest');
const app = require('../app.js');

describe("The Express Server", () => {
  beforeAll(done => {
    done();
  });

  it('should return response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
  });

  it('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
  });
});