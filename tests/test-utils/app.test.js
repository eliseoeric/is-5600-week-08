const request = require('supertest');
const app = require('../../app.js');  // Adjust the path according to your directory structure

describe('The Express Server', () => {
  beforeAll(done => {
    // The server is already ready to go with app.listen not being called
    done();
  });

  test('should return response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});