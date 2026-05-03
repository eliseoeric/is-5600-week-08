const { mockProducts, mockDb } = require('./db.mock');
const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');


jest.mock('../db', () => mockDb);

describe('Products module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  // Set up and clean up test data
  // beforeAll(async () => {
  //   await productTestHelper.setupTestData();
  // });

  // afterAll(async () => {
  //   await productTestHelper.cleanupTestData();
  // });

  // your tests go here
  it('should list all products', async() => {
    const products = await list();

    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });

  
  it('should get a product by id', async() => {
    mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1'});

    const product = await get('1234');
    expect(product.description).toBe('Product 1');
    expect(mockModel.findById).toHaveBeenCalledWith('1234')
  })

  it('should delete a product by id', async () => {
    mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1})

    const deletionResult = await destroy('1234');
    expect(deletionResult.deletedCount).toBe(1);
    expect(mockModel.deletedOne).toHaveBeenCalledWith({_id: '1234'});
  })

})




