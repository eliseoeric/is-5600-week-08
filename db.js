// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin'
);

module.exports = mongoose