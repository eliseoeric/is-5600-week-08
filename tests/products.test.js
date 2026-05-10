const productTestHelper = require('../test-utils/productTestHelper')
const { list, get, create, edit, destroy } = require('../products')

describe('Product Module Integration', () => {
  let testProductId

  beforeAll(async () => {
    await productTestHelper.setupTestData()
    const products = await list({ limit: 1 })
    testProductId = products[0]?.id
  })

  afterAll(async () => {
    await productTestHelper.cleanupTestData()
  })

  test('list returns product documents', async () => {
    const products = await list()
    expect(products.length).toBeGreaterThan(0)
    expect(products[0]).toHaveProperty('likes')
  })

  test('get returns an existing product by id', async () => {
    const product = await get(testProductId)
    expect(product).toBeTruthy()
    expect(product.id).toEqual(testProductId)
  })

  test('create, edit, and destroy a product', async () => {
    const productData = {
      description: 'Test Product',
      likes: 1,
      urls: {
        regular: 'https://example.com/regular.jpg',
        small: 'https://example.com/small.jpg',
        thumb: 'https://example.com/thumb.jpg'
      },
      links: {
        self: 'https://example.com/self',
        html: 'https://example.com/html'
      },
      user: {
        id: 'user-test',
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser'
      },
      tags: [{ title: 'testing' }]
    }

    const created = await create(productData)
    expect(created).toBeTruthy()
    expect(created.description).toBe('Test Product')

    const updated = await edit(created.id, { description: 'Updated Product' })
    expect(updated.description).toBe('Updated Product')

    await destroy(created.id)
    const deleted = await get(created.id)
    expect(deleted).toBeNull()
  })
})
