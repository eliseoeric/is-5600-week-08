const mongoose = require('mongoose');

async function connect(uri) {
  const finalUri = uri || process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fullstackprints';
  const dbName = process.env.DB_NAME || (process.env.MONGO_URL ? 'jest' : 'app');
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) { await new Promise(r => mongoose.connection.once('open', r)); return mongoose.connection; }
  await mongoose.connect(finalUri, { dbName });
  return mongoose.connection;
}

function model(name, schema) {
  return mongoose.models[name] || mongoose.model(name, schema);
}

async function disconnect() {
  if (mongoose.connection.readyState !== 0) { await mongoose.disconnect(); }
}

module.exports = { connect, model, mongoose, disconnect };
