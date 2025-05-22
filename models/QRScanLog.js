const mongoose = require('mongoose');

const QRScanLogSchema = new mongoose.Schema({
  caretakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Caretaker' },
  soVaoVien: String, // Bệnh nhân được quét
  khoaId: String,    // ID Khoa tại thời điểm quét
  khoaTen: String,   // Tên khoa
  scannedAt: { type: Date, default: Date.now },
  scanStatus: String // valid / invalid / discharged
});

module.exports = mongoose.model('QRScanLog', QRScanLogSchema);
