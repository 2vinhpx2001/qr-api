const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');

dotenv.config();
const { connectMongo } = require('./config/dbMongo');
const qrRoutes = require('./routes/qrRoutes');
const authRoutes = require('./routes/auth');


const app = express();

// Load SSL cert & key
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt'))
};

app.use(cors());
app.use(express.json());
app.use('/api/qr', qrRoutes);
app.use('/api/auth', authRoutes);


(async () => {
  await connectMongo();
  const PORT = process.env.PORT || 8080;
  https.createServer(sslOptions, app).listen(PORT,'0.0.0.0', () => {
    console.log(`✅ HTTPS QR API chạy tại https://localhost:${PORT}`);
  });
})();


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();
// const { connectMongo } = require('./config/dbMongo');
// const qrRoutes = require('./routes/qrRoutes');
// const authRoutes = require('./routes/auth');


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api/qr', qrRoutes);
// app.use('/api/auth', authRoutes);

// (async () => {
//   await connectMongo();
//   const PORT = process.env.PORT || 8080;
//   app.listen(PORT, '0.0.0.0', () => {
//     console.log(`✅ HTTP QR API chạy tại http://localhost:${PORT}`);
//   });
// })();

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');

// const { connectMongo } = require('./config/dbMongo');
// const qrRoutes = require('./routes/qrRoutes');
// const authRoutes = require('./routes/auth');

// dotenv.config();
// const app = express();

// // Load SSL cert & key
// const sslOptions = {
//   key: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt'))
// };

// app.use(cors());
// app.use(express.json());

// // Serve static frontend from dist/
// const distPath = path.resolve(__dirname, 'dist');
// app.use(express.static(distPath));

// // API routes
// app.use('/api/qr', qrRoutes);
// app.use('/api/auth', authRoutes);

// // Fallback route for React
// app.get('*', (req, res) => {
//   if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'API not found' });

//   res.sendFile(path.join(distPath, 'index.html'));
// });

// // Start HTTPS server
// (async () => {
//   await connectMongo();
//   const PORT = process.env.PORT || 8080;
//   https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
//     console.log(`✅ HTTPS QR API & Frontend tại https://nnb.bvgnd.org.vn:${PORT}`);
//   });
// })();

