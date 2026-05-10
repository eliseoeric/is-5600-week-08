const { mockDb, mockProducts, mockModel } = require('./db.mock')

jest.mock('../db', () => mockDb)

describe('Product Module with mocked DB', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('list returns mocked product data', async () => {
    const { list } = require('../products')

    const products = await list()
    expect(products).toEqual(mockProducts)
    expect(mockDb.model).toHaveBeenCalledWith('Product')
    expect(mockModel.find).toHaveBeenCalled()
  })
})
