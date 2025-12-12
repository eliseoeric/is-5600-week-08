// ✔️ Do NOT import from node:test
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe("Product Model", () => {

  it("should create a product with valid fields", async () => {
    const product = new Product({
      title: "Test Product",
      description: "A product used in testing",
      price: 19.99
    });

    const saved = await product.save();

    expect(saved._id).toBeDefined();
    expect(saved.title).toBe("Test Product");
    expect(saved.price).toBe(19.99);
  });

  it("should fail when missing required fields", async () => {
    const product = new Product({}); // missing fields

    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

});
