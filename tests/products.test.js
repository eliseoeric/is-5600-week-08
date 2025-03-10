const { mockDb, mockProducts, mockModel } = require('./db.mock');
const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');
const { list } = require('../products');
const { get } = require('express/lib/response');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should list products', async () => {
            const products = await list();
            expect(products.length).toBe(2);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

            // call to get the product using the `get` method
            // your assertions
            const products = await get('1234')
            expect(product.description).toBe('Product 1')
            expect(product.findById).toHaveBeenCalledWith('1234')

          });
          it('should delete a product by Id', async () => {
            // Mock the Product.findById method to return a specific product
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            // call to get the product using the `get` method
            // your assertions
            const deletionResult = await get('1234')
            expect(deletionResult.deletedCount).toBe(1)
            expect(mockModel.deleteOne).toHaveBeenCalledWith({_id:'1234'})
    });

})  ;
})