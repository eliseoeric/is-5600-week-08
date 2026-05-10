// db.js
const mongoose = require('mongoose')

const dbName = process.env.NODE_ENV === 'test' ? 'test' : 'fullstackprints';

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://root:example@db:27017/${dbName}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose