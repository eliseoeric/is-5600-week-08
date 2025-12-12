const request = require("supertest");
const app = require("../server"); // Your Express app

describe("Product Routes Integration", () => {

  it("GET /api/products should return array", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/products should create a product", async () => {
    const newProduct = {
      title: "New Shirt",
      description: "Printed shirt",
      price: 29.99,
    };

    const response = await request(app)
      .post("/api/products")
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Shirt");
  });

});
