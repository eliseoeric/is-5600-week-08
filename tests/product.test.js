const { mockDb, mockProducts } = require('./db.mock'); // Import the mocked DB
const { list, get, destroy } = require('../products'); // Import your actual products module

jest.mock('../db', () => mockDb); // Mock the db module

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();  // Clear any mocks before each test
  });

  it('should list all products', async () => {
    // Mock the return value for the `find` method to simulate listing all products
    mockDb.model().find.mockResolvedValue(mockProducts);

    const products = await list(); // Call the actual list function

    // Assertions
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });

  it('should get a product by id', async () => {
    // Mock the `findById` method to simulate retrieving a product by ID
    mockDb.model().findById.mockResolvedValue({ description: 'Product 1', id: '1234' });

    // Call the get function to get the product by id
    const product = await get('1234');

    // Assertions
    expect(product.description).toBe('Product 1');
    expect(product.id).toBe('1234');
    expect(mockDb.model().findById).toHaveBeenCalledWith('1234');
  });

  it('should destroy (delete) a product by id', async () => {
    // Mock the `deleteOne` method to simulate deleting a product
    mockDb.model().deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

    // Call the destroy function to delete the product by id
    const result = await destroy('1234');

    // Assertions
    expect(result.deletedCount).toBe(1);  // Verify that one product was deleted
    expect(mockDb.model().deleteOne).toHaveBeenCalledWith({ _id: '1234' });  // Ensure deleteOne was called with the correct product ID
  });
});