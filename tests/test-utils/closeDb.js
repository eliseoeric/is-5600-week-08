// tests/test-utils/closeDb.js
const mongoose = require('mongoose');

module.exports = async function closeDb() {
  // Close mongoose if it’s connected (covers in-memory & normal)
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};