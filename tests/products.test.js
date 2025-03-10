const { mockDb, mockProducts } = require('./db.mock');
const { list } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

jest.mock('../db', () => mockDb);
describe('Product Module', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })


    it('should list all products', async () => {
        const products = await list();


        expect(products[1].description).toBeGreatherThan(0);
      });


});