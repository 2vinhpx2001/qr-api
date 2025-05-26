const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');

const { connectMongo } = require('./config/dbMongo');
const qrRoutes = require('./routes/qrRoutes');

dotenv.config();
const app = express();

// Load SSL cert & key
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt'))
};

app.use(cors());
app.use(express.json());
app.use('/api/qr', qrRoutes);

(async () => {
  await connectMongo();
  const PORT = process.env.PORT || 8080;
  https.createServer(sslOptions, app).listen(PORT,'0.0.0.0', () => {
    console.log(`✅ HTTPS QR API chạy tại https://localhost:${PORT}`);
  });
})();
