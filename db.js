const mongoose = require('mongoose');

const mongoUri =
  process.env.MONGO_URL || // provided by @shelf/jest-mongodb
  'mongodb://127.0.0.1:27017/fullstack_prints';

mongoose.set('strictQuery', false);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
