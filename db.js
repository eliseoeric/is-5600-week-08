// db.js
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
}

module.exports = mongoose;