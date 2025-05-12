describe('Product Module', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
    });
  });

  // ====== TASK 3: Add "get" test here ======
  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ 
        _id: '123', 
        description: 'Product 1' 
      });
      
      const product = await get('123');
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  // ====== TASK 4: Add "destroy" test here ======
  describe('destroy', () => {
    it('should delete a product', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await destroy('123');
      expect(result.deletedCount).toBe(1);
    });
  });
});