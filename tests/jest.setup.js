const mongoUri = global.__MONGO_URI__ || process.env.MONGO_URL;

if (mongoUri) {
  process.env.MONGODB_URI = mongoUri;
}

jest.setTimeout(30000);