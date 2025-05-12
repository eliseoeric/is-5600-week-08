const request = require('supertest');
const app = require('../app'); // Adjust path if your app.js is in a different folder

describe('Fullstack Prints Integration Tests', () => {

  test('should respond at /orders with status 200', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // assuming /orders returns an array
  });

  test('should respond at /products with status 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // assuming /products returns an array
  });

  test('should create a new product with POST /products', async () => {
    const newProduct = {
      name: 'Test Shirt',
      price: 29.99,
      tags: [{ title: 'test' }]
    };

    const res = await request(app)
      .post('/products')
      .send(newProduct)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Shirt');
  });

});