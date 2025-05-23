const crypto = require('crypto');
const SECRET = 'sieuthubimat123';

function verifyQrPayload({ qrToken, ts, signature }) {
  if (!qrToken || !ts || !signature) return false;
  if (!SECRET) {
    console.error('QR_SECRET is not defined in environment variables');
    return false;
  }

  const payload = JSON.stringify({ qrToken, ts });
  const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return expectedSig === signature;
}

module.exports = { verifyQrPayload };
