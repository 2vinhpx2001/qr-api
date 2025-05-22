const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectMongo } = require('./config/dbMongo');
const qrRoutes = require('./routes/qrRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/qr', qrRoutes);

(async () => {
  await connectMongo();
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`✅ QR API chạy tại cổng ${PORT}`));
})();
