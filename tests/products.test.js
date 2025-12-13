const productTestHelper = require("./test-utils/productTestHelper");
const { mockDb, mockProducts, mockModel } = require("./db.mock");
const { list } = require("../products");
jest.mock("../db", () => mockDb);
describe("Product Module", () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });
  describe("list", () => {
    it("should list products", async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe("Product 1");
      expect(products[1].description).toBe("Product 2");
    });
  });
  describe("get", () => {
    it("should get a product by id", async () => {
      mockModel.findById = jest
        .fn()
        .mockResolvedValue({ description: "Product 1" });
      const product = await get("Product 1");
      expect(product).toBeDefined();
      expect(product.description).toBe("Product 1");
    });
  });

  describe("destroy", () => {
    it("should delete a product by id", async () => {
      mockDb.Product.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount: 1 });
      const result = await destroy("some-product-id");
      expect(result.deletedCount).toBe(1);
    });
  });
});
