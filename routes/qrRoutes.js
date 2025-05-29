const express = require('express');
const router = express.Router();
const Caretaker = require('../models/Caretaker');
const QRScanLog = require('../models/QRScanLog');
const verifyToken = require('../middleware/verifyToken');
const { verifyQrPayload } = require('../utils/verifyHmac');

router.post('/scan-secure',verifyToken, async (req, res) => {
  const { qrToken, ts, signature } = req.body;

  if (!qrToken || !ts || !signature) {
    return res.status(400).json({ valid: false, message: 'Thiếu dữ liệu QR' });
  }

  if (!verifyQrPayload({ qrToken, ts, signature })) {
    return res.status(400).json({ valid: false, message: 'QR không hợp lệ hoặc bị chỉnh sửa' });
  }

  try {
    const caretaker = await Caretaker.findOne({ qrToken });

    if (!caretaker) {
      return res.json({ valid: false, message: '❌ Thẻ đã bị hủy do thay đổi người nuôi bệnh' });
    }

    if (!caretaker.isActive) {
      return res.json({ valid: false, message: '❌ Thẻ đã bị hủy do thay đổi người nuôi bệnh' });
    }

    if (caretaker.dischargedAt) {
      const diff = (Date.now() - new Date(caretaker.dischargedAt)) / (1000 * 60 * 60);
      if (diff > 2) {
        return res.json({ valid: false, message: '⛔ Bệnh nhân đã ra viện hơn 2 tiếng' });
      }
    }

    await QRScanLog.create({
      caretakerId: caretaker._id,
      soVaoVien: caretaker.soVaoVien,
      khoaId: caretaker.khoaId,
      khoaTen: caretaker.khoaTen,
      scanStatus: 'valid',
      scannedAt: new Date(),
    });

    res.json({
      valid: true,
      message: '✅ Người nuôi bệnh hợp lệ',
      data: {
        caretakerName: caretaker.caretakerName,
        caretakerCCCD: caretaker.caretakerCCCD,
        birthYear: caretaker.birthYear,
        address: caretaker.address,
        photoUrls: caretaker.photoUrls,
      },
    });
  } catch (err) {
    console.error('❌ QR Error:', err);
    res.status(500).json({ valid: false, message: 'Lỗi máy chủ' });
  }
});

module.exports = router;