// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin',
  {
    useNewUrlParser: true,const mockProducts = [
      { description: 'Product 1' },
      { description: 'Product 2' }
  ];
    useUnifiedTopology: true
  }
);

module.exports = mongoose
const mockQuery = {
  sort: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
  skip: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
  limit: jest.fn().mockReturnThis(), // Returns 'this' to allow chaining
  exec: jest.fn().mockResolvedValue(mockProducts),  // Simulates DB query execution
  then: function(resolve) { resolve(mockProducts) }  // Makes the query thenable (Promise-like)
};
