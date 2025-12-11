const fs = require('fs/promises');
const path = require('path');
const Products = require('../../products'); 
const Orders = require('../../orders');
const db = require('../../db'); 

const productTestHelper = {
  createdProducts: [],   
  testOrderIds: [],
  async setupTestData() {
    try {
      console.log('Loading test products...');
      try {
        if (db && typeof db.connect === 'function') {
          await db.connect();
        }
      } catch (e) {
        
      }
      try {
        if (db && db.connection && db.connection.db) {
          await db.connection.db.collection('products').deleteMany({});
        }
      } catch (err) {

        console.warn('Warning: could not clear products collection before seeding:', err && err.message);
      }
      const jsonPath = path.join(process.cwd(), 'data', 'full-products.json');
      const file = await fs.readFile(jsonPath, 'utf8');
      const testProducts = JSON.parse(file);

      this.createdProducts = [];

      for (const product of testProducts) {
      
        if (!product.price) product.price = Math.floor(Math.random() * 100) + 1;

        try {
          const created = await Products.create(product);
          const doc =
            created && created._doc
              ? created._doc
              : typeof created.toObject === 'function'
              ? created.toObject()
              : created;

          this.createdProducts.push(doc);
        } catch (err) {
          if (err && err.code === 11000) {         
            continue;
          }
          console.warn('Failed creating product during seeding:', err && err.message ? err.message : err);
        }
      }

      console.log('Test products loaded successfully. Count:', this.createdProducts.length);
      return this.createdProducts;
    } catch (err) {
      console.error('Error in setupTestData:', err && err.message ? err.message : err);
      throw err;
    }
  },
  async cleanupTestData() {
    try {
      console.log('Cleaning up test products and orders...');

      if (Array.isArray(this.createdProducts) && this.createdProducts.length) {
        for (const p of this.createdProducts) {
          const id = p._id || p.id;
          try {
            if (typeof Products.destroy === 'function') {
              await Products.destroy(id);
            } else if (Products && typeof Products.edit === 'function') {
            }
          } catch (e) {
            console.warn('Warning: failed to remove product', id, e && e.message);
          }
        }
      }
      if (Array.isArray(this.testOrderIds) && this.testOrderIds.length) {
        for (const oid of this.testOrderIds) {
          try {
            if (Orders && typeof Orders.destroy === 'function') {
              await Orders.destroy(oid);
            }
          } catch (e) {
            console.warn('Warning: failed to remove order', oid, e && e.message);
          }
        }
      }
      this.createdProducts = [];
      this.testOrderIds = [];

      console.log('Test products and orders cleaned up successfully');
    } catch (err) {
      console.error('Error in cleanupTestData:', err && err.message);
      throw err;
    }
  },
  async createTestOrder() {
    if (!this.createdProducts || this.createdProducts.length === 0) {
      throw new Error('No test products available. Run setupTestData() first.');
    }

    const numProducts = Math.floor(Math.random() * Math.min(10, this.createdProducts.length)) + 1;
    const products = [];

    for (let i = 0; i < numProducts; i++) {
      const idx = Math.floor(Math.random() * this.createdProducts.length);
      const pid = this.createdProducts[idx]._id || this.createdProducts[idx].id;
      products.push(String(pid));
    }

    const orderData = {
      buyerEmail: `test${Date.now()}@example.com`,
      products,
      status: 'pending'
    };

    const OrdersModule = Orders;
    const createdOrder = await OrdersModule.create(orderData);

    const id = createdOrder && (createdOrder._id || createdOrder.id || (createdOrder._doc && createdOrder._doc._id));
    if (id) this.testOrderIds.push(String(id));

    return createdOrder;
  },

  async createTestOrders(count = 5) {
    const orders = [];
    for (let i = 0; i < count; i++) {
      orders.push(await this.createTestOrder());
    }
    return orders;
  }
};

module.exports = productTestHelper;
