const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("Products API", () => {

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });

  it("GET /products should return an array", async () => {
    const res = await request(app).get("/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /products creates a product", async () => {
    const newProduct = {
      title: "Test Product",
      description: "A sample item",
      price: 25
    };

    const res = await request(app)
      .post("/products")
      .send(newProduct);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Product");
  });
});
