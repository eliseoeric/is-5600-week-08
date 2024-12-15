product.price = Math.floor(Math.random() * 100) + 1;
}
const createdProduct = await create(product);
this.testProductIds.push(createdProduct.id);
}
console.log('Test products loaded successfully');
},

}
console.log('Test products cleaned up successfully');
},

// Optional helper if needed for orders:
async createTestOrders(count = 5) {
const { create: createOrder } = require('../orders');
for (let i = 0; i < count; i++) {
await createOrder({
  buyerEmail: `testbuyer${i}@example.com`,
  items: [
    {
      productId: this.testProductIds[0],
      quantity: 1
    }
  ]
});
}
}
};