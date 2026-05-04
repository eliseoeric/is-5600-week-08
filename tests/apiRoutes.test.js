const request = require('supertest')

jest.mock('../products', () => ({
  list: jest.fn(),
  get: jest.fn(),
}))

jest.mock('../orders', () => ({
  create: jest.fn(),
  list: jest.fn(),
  edit: jest.fn(),
}))

const Products = require('../products')
const Orders = require('../orders')
const app = require('../app')

describe('Express API integration tests', () => {
  beforeEach(() => {
    Products.list.mockReset()
    Products.get.mockReset()
    Orders.create.mockReset()
    Orders.list.mockReset()
    Orders.edit.mockReset()
  })

  describe('Products routes', () => {
    it('returns products list with query values', async () => {
      const sampleProducts = [
        { _id: 'p1', description: 'Print 1', likes: 10 },
        { _id: 'p2', description: 'Print 2', likes: 20 }
      ]

      Products.list.mockResolvedValue(sampleProducts)

      const response = await request(app)
        .get('/products?offset=5&limit=10&tag=art')
        .expect(200)

      expect(response.body).toEqual(sampleProducts)
      expect(Products.list).toHaveBeenCalledWith({
        offset: 5,
        limit: 10,
        tag: 'art'
      })
    })

    it('returns a product when found by id', async () => {
      const product = { _id: 'p123', description: 'Featured Print', likes: 42 }
      Products.get.mockResolvedValue(product)

      const response = await request(app)
        .get('/products/p123')
        .expect(200)

      expect(response.body).toEqual(product)
      expect(Products.get).toHaveBeenCalledWith('p123')
    })

    it('returns 404 when product is not found', async () => {
      Products.get.mockResolvedValue(null)

      await request(app)
        .get('/products/nonexistent')
        .expect(404)

      expect(Products.get).toHaveBeenCalledWith('nonexistent')
    })

    it('creates a product and echoes the posted payload', async () => {
      const payload = { description: 'New Print', likes: 5 }

      const response = await request(app)
        .post('/products')
        .send(payload)
        .expect(200)

      expect(response.body).toEqual(payload)
    })

    it('edits a product and returns the request body', async () => {
      const payload = { description: 'Updated Print', likes: 99 }

      const response = await request(app)
        .put('/products/p123')
        .send(payload)
        .expect(200)

      expect(response.body).toEqual(payload)
    })

    it('deletes a product and returns success', async () => {
      const response = await request(app)
        .delete('/products/p123')
        .expect(200)

      expect(response.body).toEqual({ success: true })
    })
  })

  describe('Orders routes', () => {
    it('creates an order and returns the created order', async () => {
      const orderPayload = { buyerEmail: 'test@example.com', products: ['p1', 'p2'] }
      const orderResponse = { _id: 'o1', buyerEmail: 'test@example.com', products: ['p1', 'p2'], status: 'CREATED' }

      Orders.create.mockResolvedValue(orderResponse)

      const response = await request(app)
        .post('/orders')
        .send(orderPayload)
        .expect(200)

      expect(response.body).toEqual(orderResponse)
      expect(Orders.create).toHaveBeenCalledWith(orderPayload)
    })

    it('returns orders list and forwards query parameters', async () => {
      const sampleOrders = [
        { _id: 'o1', buyerEmail: 'buyer1@example.com', products: ['p1'], status: 'COMPLETED' }
      ]

      Orders.list.mockResolvedValue(sampleOrders)

      const response = await request(app)
        .get('/orders?offset=2&limit=5&productId=p1&status=COMPLETED')
        .expect(200)

      expect(response.body).toEqual(sampleOrders)
      expect(Orders.list).toHaveBeenCalledWith({
        offset: 2,
        limit: 5,
        productId: 'p1',
        status: 'COMPLETED'
      })
    })

    it('updates an order and returns the edited order', async () => {
      const updatePayload = { status: 'PENDING' }
      const orderResponse = { _id: 'o1', buyerEmail: 'buyer1@example.com', products: ['p1'], status: 'PENDING' }
      Orders.edit.mockResolvedValue(orderResponse)

      const response = await request(app)
        .put('/orders/o1')
        .send(updatePayload)
        .expect(200)

      expect(response.body).toEqual(orderResponse)
      expect(Orders.edit).toHaveBeenCalledWith('o1', updatePayload)
    })
  })
})
