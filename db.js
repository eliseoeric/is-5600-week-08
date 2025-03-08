const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://root:example@db:27017/test?authSource=admin';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB successfully"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose;