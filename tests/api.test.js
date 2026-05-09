const request = require("supertest")
const app = require("../api")

describe("API Tests", () => {

  test("GET / should return API running", async () => {
    const response = await request(app).get("/")

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe("API running")
  })

  test("GET /products should return array", async () => {
    const response = await request(app).get("/products")

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test("POST /orders should create new order", async () => {
    const response = await request(app)
      .post("/orders")
      .send({
        items: [
          { id: 1, name: "Laptop" }
        ]
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.items.length).toBe(1)
  })

})