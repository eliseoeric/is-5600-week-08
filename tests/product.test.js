describe('Placeholder', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});
// tests/product.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should run a placeholder test', () => {
        expect(true).toBe(true);
    });
});