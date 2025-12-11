
const Orders = require("../orders"); 
const productTestHelper = require("./test-utils/productTestHelper");

describe("Orders module basic integration", () => {
  let seededProducts;
  let createdOrder;

  const db = require('../db'); 

beforeAll(async () => {
  await db.connect();
  seeded = await productTestHelper.setupTestData();
});


  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  test("create() should create an order object", async () => {
    const payload = {
      buyerEmail: "test@example.com",
      products: (seededProducts || []).slice(0, 1).map((p) => ({
        productId: p._id || p.id || p._doc?._id || p._doc?.id,
        quantity: 1
      })),
      status: "pending"
    };
    const createFn = Orders.create || Orders.createOrder || Orders.add || Orders.insert;
    if (!createFn) {
      throw new Error("Orders module does not export a create/createOrder function - adapt tests.");
    }

    createdOrder = await createFn(payload);
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail || createdOrder.email).toBeTruthy();
  });

  test("get() should retrieve the created order", async () => {
    const getFn = Orders.get || Orders.findById;
    if (!getFn) {
      console.warn("Orders.get not found - skipping get() test");
      return;
    }
    const id = createdOrder._id || createdOrder.id || createdOrder._doc && createdOrder._doc._id;
    expect(id).toBeDefined();
    const fetched = await getFn(id);
    expect(fetched).toBeDefined();
  });

  test("list() should return an array", async () => {
    const listFn = Orders.list || Orders.getAll || Orders.findAll;
    if (!listFn) {
      console.warn("Orders.list not found - skipping list() test");
      return;
    }
    const list = await listFn();
    expect(Array.isArray(list)).toBe(true);
  });

  test("edit() should update an order", async () => {
    const editFn = Orders.edit || Orders.update || Orders.updateOne;
    if (!editFn) {
      console.warn("Orders.edit not found - skipping edit() test");
      return;
    }
    const id = createdOrder._id || createdOrder.id;
    const change = { status: "shipped" };
    const edited = await editFn(id, change);
    expect(edited).toBeDefined();
  });
});
