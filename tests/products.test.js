// tests/products.test.js
const productTestHelper = require('./test-utils/productTestHelper');
const { list } = require('../products');
const { mockDb, mockProducts } = require('./db.mock');
const { describe } = require('node:test');
const { get } = require('http');

jest.mock('../db', () => mockDb);


describe('Product Module', ()=> {

    beforeEach(() => {
        jest.clearAllMocks();
    });

   // Set up and clean up test data
  //beforeAll(async () => {
    //await productTestHelper.setupTestData();
 // });


  //afterAll(async () => {
    //await productTestHelper.cleanupTestData();
  //});


    it('should list all products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
          expect(products[1].description).toBe('Product 2');
      });


      it('should get a product by id', async () => {
        // Mock the Product.findById method to return a specific product
        mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
        
        const product = await get('1234');
        expect(product.description).toBe('product 1');
        expect(mockModel.findBYId).toHaveBeenCalledWith('1234');
        // call to get the product using the `get` method
        // your assertions
      });

      it('should delete a product by id', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });     
     })

     const deletionResult = await destroy('1234'); 
     expect(deletionResult.deletedCount).toBe(1);
     expect(mockModel.deleteOne).toHaveBeenCalled({id: '1234'})
  });
