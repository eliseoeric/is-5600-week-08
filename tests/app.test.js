const request = require("supertest");
const app = require("../app"); 

describe("Express app smoke tests", () => {
  test("GET / returns 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET /products returns 200 and array", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /orders returns 200 and array", async () => {
    const res = await request(app).get("/orders");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
