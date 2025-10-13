// app.js
const express = require('express');
const api = require('./api');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('OK'));
app.use('/', api);

// Export the app for supertest
module.exports = app;

// Only start server + DB when run directly, not during Jest
if (require.main === module) {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fullstackprints';
  db.connect(uri).then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API listening on ${port}`));
  }).catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
}
