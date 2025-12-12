// tests/products.test.js

// Make sure to include mockModel and the functions (list, get, destroy)
const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products'); 

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
    });

    // Task 3: Add "get" test to products
    describe('get', () => {
        it('should get a product by id', async () => {
            // Mock the Product.findById method to return a specific product
            const mockProduct = { description: 'The Product We Want' };
            mockModel.findById = jest.fn().mockResolvedValue(mockProduct);

            const productId = 'abc12345'; 
            const product = await get(productId);

            expect(product).toBeDefined();
            expect(product.description).toBe(mockProduct.description);
            expect(mockModel.findById).toHaveBeenCalledWith(productId);
        });
    });
    
    // Task 4: Add "destroy" test to products
    describe('destroy', () => {
        it('should delete a product', async () => {
            // Mock the Product.deleteOne method to simulate a successful delete
            const mockDeleteResult = { deletedCount: 1 };
            mockModel.deleteOne = jest.fn().mockResolvedValue(mockDeleteResult);

            const productId = 'abc12345'; 
            await destroy(productId);
            
            expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: productId }); 
        });
    });
});