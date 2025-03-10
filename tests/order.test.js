create order.test.js                                                                                                                                 // Add this test block to tests/orders.test.js
describe('get', () => {
  it('should get an order by id', async () => {
    // Get the order using the ID from the previously created order
    const order = await get(createdOrder._id);
    
    // Assert that the order exists
    expect(order).toBeDefined();
    
    // Assert that the IDs match
    expect(order._id.toString()).toBe(createdOrder._id.toString());
    
    // Optional: verify other properties match as well
    expect(order.buyerEmail).toBe(createdOrder.buyerEmail);
  });
});                                                                                                     // Add this test block to tests/orders.test.js
describe('edit', () => {
  it('should edit an order', async () => {
    // Define changes to apply to the order
    const change = {
      status: 'shipped',
      shippingAddress: {
        street: '456 Updated St',
        city: 'New City',
        state: 'NS',
        zip: '54321'
      }
    };
    
    // Call the edit method with the order ID and changes
    const editedOrder = await edit(createdOrder._id, change);
    
    // Assert that the edited order exists
    expect(editedOrder).toBeDefined();
    
    // Assert that the ID remains the same
    expect(editedOrder._id.toString()).toBe(createdOrder._id.toString());
    
    // Assert that changes were applied
    expect(editedOrder.status).toBe(change.status);
    expect(editedOrder.shippingAddress.street).toBe(change.shippingAddress.street);
    expect(editedOrder.shippingAddress.city).toBe(change.shippingAddress.city);
  });
});