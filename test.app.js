const request = require('supertest');
const app = require('../app.js');

describe('Express Server Tests', () => {
    beforeAll(done => done());

    test('Should return response for root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('Should respond at /products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
    });

    test('Should respond at /orders', async () => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(200);
    });
});