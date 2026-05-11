const request = require('supertest');
const app = require('../app');

describe('Application Routes', () => {

    test('GET / should return status 200', async () => {

        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);

    });

    test('GET /products should return products', async () => {

        const response = await request(app).get('/products');

        expect(response.statusCode).toBe(200);

    });

});
test('POST /products should create a product', async () => {

    const newProduct = {
        name: 'Test Product',
        price: 100
    };

    const response = await request(app)
        .post('/products')
        .send(newProduct);

    expect(response.statusCode).toBe(200);

});