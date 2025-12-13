// db.js
const mongoose = require('mongoose')

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-prints'

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

module.exports = mongoose