const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module Tests', () => {
    let createdOrder;

    beforeAll(async () => {
        await productTestHelper.setupTestData();
        await productTestHelper.createTestOrders(5);
    });

    afterAll(async () => {
        await productTestHelper.cleanupTestData();
    });

    test('Should create an order', async () => {
        createdOrder = await create(orderData);
        expect(createdOrder).toBeDefined();
        expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });

    test('Should get an order by ID', async () => {
        const order = await get(createdOrder._id);
        expect(order).toBeDefined();
        expect(order._id.toString()).toBe(createdOrder._id.toString());
        expect(order.buyerEmail).toBe(orderData.buyerEmail);
    });

    test('Should edit an order', async () => {
        const change = { buyerEmail: 'newemail@gmail.com' };
        const editedOrder = await edit(createdOrder._id, change);
        expect(editedOrder).toBeDefined();
        expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
});