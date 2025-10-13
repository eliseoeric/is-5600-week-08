const db = require('../../db');
const { mongoose } = db;

const ProductSchema = new mongoose.Schema({ description: String, price: Number }, { timestamps: true });
const OrderSchema   = new mongoose.Schema({ buyerEmail: String, items: [{ productId: String, qty: Number }] }, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Order   = mongoose.models.Order   || mongoose.model('Order', OrderSchema);

async function ensureConnected() {
  const uri = process.env.MONGO_URL;
  console.log('MONGO_URL present?', Boolean(uri));
  try {
    await db.connect(uri);
    await mongoose.connection.db.admin().ping();
    console.log('Connected to in-memory Mongo:', mongoose.connection.name);
  } catch (err) {
    console.error('Failed to connect to in-memory Mongo:', err);
    throw err;
  }
}

async function setupTestData() {
  console.log('Loading test products...');
  await ensureConnected();
  await Order.deleteMany({});
  await Product.deleteMany({});
  await Product.insertMany([
    { description: 'P1', price: 10 },
    { description: 'P2', price: 20 },
    { description: 'P3', price: 30 }
  ]);
  console.log('Test products loaded successfully');
}

async function createTestOrders(n = 5) {
  const products = await Product.find().lean();
  const items = products.slice(0, 2).map(p => ({ productId: String(p._id), qty: 1 }));
  const docs = Array.from({ length: n }).map((_, i) => ({ buyerEmail: `buyer${i}@example.com`, items }));
  await Order.insertMany(docs);
}

async function cleanupTestData() {
  console.log('Cleaning up test products...');
  await Product.deleteMany({});
  console.log('Cleaning up test orders...');
  await Order.deleteMany({});
  await mongoose.connection.dropDatabase();
  await db.disconnect();
  console.log('Test products and orders cleaned up successfully');
}

module.exports = { setupTestData, createTestOrders, cleanupTestData, Product, Order };
