const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Passcode = require('../models/Passcode'); // 👈 Import model

const SECRET = process.env.JWT_SECRET;

router.post('/passcode', async (req, res) => {
  const { code } = req.body;

  try {
    // Tìm passcode trong DB
    const match = await Passcode.findOne({ code });
    if (!match) {
      return res.status(401).json({ success: false, message: 'Sai passcode' });
    }

    // Nếu đúng → tạo token
    const token = jwt.sign({ role: 'scanner' }, SECRET, { expiresIn: '10h' });
    res.json({ success: true, token });
  } catch (error) {
    console.error('Lỗi truy vấn passcode:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

module.exports = router;
