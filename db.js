// db.js
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://root:example@db:27017/?authSource=admin'

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose