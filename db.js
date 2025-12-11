const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL || 'mongodb://root:example@127.0.0.1:27017/?authSource=admin';
let connected = false;
async function connect() {
  if (connected || mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const opts = {
    
    serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS) || 5000,
  };

  await mongoose.connect(MONGO_URL, opts);
  connected = true;
  return mongoose;
}
const model = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

module.exports = {
  connect,
  model,
  Schema,
  connection: mongoose.connection,
  mongoose
};
