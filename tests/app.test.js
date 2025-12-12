// tests/app.test.js

const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {

    test('should return response at root', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('should respond at /products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
    });

    test('should respond at /orders', async () => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(200);
    });

});
