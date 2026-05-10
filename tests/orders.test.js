const productTestHelper = require('../test-utils/productTestHelper')
const { create: createOrder, list: listOrders, get: getOrder, edit: editOrder, destroy: destroyOrder } = require('../orders')

describe('Orders Module Integration', () => {
  let productId
  let orderId

  beforeAll(async () => {
    await productTestHelper.setupTestData()
    productId = productTestHelper.testProductIds[0]
  })

  afterAll(async () => {
    if (orderId) {
      await destroyOrder(orderId)
    }
    await productTestHelper.cleanupTestData()
  })

  test('create order populates product references', async () => {
    const order = await createOrder({
      buyerEmail: 'order-test@example.com',
      products: [productId]
    })

    orderId = order.id
    expect(order).toBeTruthy()
    expect(order.products).toBeDefined()
    expect(order.products[0]._id || order.products[0].id).toEqual(productId)
  })

  test('list returns orders filtered by productId', async () => {
    const orders = await listOrders({ productId })
    expect(Array.isArray(orders)).toBe(true)
    expect(orders.some(o => o.products.includes(productId))).toBe(true)
  })

  test('edit updates order status', async () => {
    const updated = await editOrder(orderId, { status: 'COMPLETED' })
    expect(updated.status).toBe('COMPLETED')

    const fetched = await getOrder(orderId)
    expect(fetched.status).toBe('COMPLETED')
  })
})
