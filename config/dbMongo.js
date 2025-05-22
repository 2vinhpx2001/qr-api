// config/dbMongo.js
const mongoose = require('mongoose');

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('✅ Đã kết nối MongoDB');
};

module.exports = { connectMongo };
