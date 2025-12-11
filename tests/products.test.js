const db = require('../db');
beforeAll(async () => {
  await db.connect(); 
  seeded = await productTestHelper.setupTestData();
});
const request = require("supertest");
const app = require("../app");
const productTestHelper = require("./test-utils/productTestHelper");

describe("Products endpoints (integration)", () => {
  let seeded;

  beforeAll(async () => {
    seeded = await productTestHelper.setupTestData();
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  test("GET /products returns list (non-empty)", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /products/:id returns a product", async () => {
    const id = seeded && seeded[0] && (seeded[0]._id || seeded[0].id);
    expect(id).toBeDefined();
    const res = await request(app).get(`/products/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body._id || res.body.id).toBeTruthy();
  });
});
