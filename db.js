const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

module.exports = { connect, close };
