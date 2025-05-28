const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const router = express.Router();


// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Sai tài khoản' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    // ✅ Tạo JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET,
      { expiresIn: '30m' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
