// tests/db.mock.js

// fake query result
const mockProducts = [
  { _id: 'p1', description: 'Product 1', likes: 10, urls: { regular:'', small:'', thumb:'' }, links:{ self:'', html:'' }, user:{ id:'u', first_name:'A', username:'a' }, tags:[{title:'texture'}] },
  { _id: 'p2', description: 'Product 2', likes: 20, urls: { regular:'', small:'', thumb:'' }, links:{ self:'', html:'' }, user:{ id:'u', first_name:'B', username:'b' }, tags:[{title:'abstract'}] }
];

// a query-like object that supports chaining & awaiting
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProducts),
  then(resolve) { resolve(mockProducts); } // allow await on the chain
};

// a model-like stub
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery),
  findById: jest.fn(),
  deleteOne: jest.fn()
};

// db-like stub; Schema is a dummy constructor so "new db.Schema" doesn't crash
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel),
  Schema: function(){}
};

module.exports = {
  mockDb,
  mockModel,
  mockProducts,
  mockQuery
};