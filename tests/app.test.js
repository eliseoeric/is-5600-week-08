const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  test('should return status 200 on /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
