

const request = require("supertest");
const app = require("../app");

describe("API Integration Tests", () => {

  it("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("GET /products should return 200", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });

  it("GET /products should return an array", async () => {
    const res = await request(app).get("/products");
    expect(Array.isArray(res.body)).toBe(true);
  });

});