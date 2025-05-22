const crypto = require('crypto');
const SECRET = process.env.QR_SECRET;

function verifyQrPayload({ qrToken, ts, signature }) {
  const payload = JSON.stringify({ qrToken, ts });
  const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return expectedSig === signature;
}

module.exports = { verifyQrPayload };
