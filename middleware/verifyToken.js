const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Không có token. Truy cập bị từ chối.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Lưu thông tin user nếu cần
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
}

module.exports = verifyToken;
