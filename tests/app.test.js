const request = require('supertest')
const app = require('../app')

describe('Express Server', () => {
  test('responds to /', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  })

  test('responds to /products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('responds to /orders', async () => {
    const res = await request(app).get('/orders')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
