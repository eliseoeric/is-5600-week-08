const request = require("supertest");
const server = require("../app");

describe("Products API Integration Test", () => {
  afterAll(done => {
    server.close(done); // ensures Jest exits cleanly
  });

  it("GET /products should return 200", async () => {
    const res = await request(server).get("/products");
    expect(res.statusCode).toBe(200);
  });
});
