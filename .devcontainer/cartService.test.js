// Imagine cartService calls a database function like getProductById
jest.mock("../services/productService");

const productService = require("../services/productService");
const cartService = require("../services/cartService");

describe("Cart Service", () => {

  it("should calculate total price", async () => {

    productService.getProductById.mockResolvedValue({
      price: 10,
    });

    const total = await cartService.calculateCartTotal([
      { productId: "123", quantity: 3 }
    ]);

    expect(total).toBe(30);
  });

});
