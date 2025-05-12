describe('Orders Module', () => {
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  // ====== TASK 1: Add "get" test here ======
  describe('get', () => {
    it('should get an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id.toString()).toBe(createdOrder._id.toString());
    });
  });

  // ====== TASK 2: Add "edit" test here ======
  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { buyerEmail: 'new@email.com' };
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe('new@email.com');
    });
  });
});