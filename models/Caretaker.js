const mongoose = require('mongoose');

const CaretakerSchema = new mongoose.Schema({
  soVaoVien: { type: String, required: true, unique: true },
  caretakerName: String,
  caretakerCCCD: String,
  birthYear: String,
  address: String,
  photoUrls: [String],
  isActive: Boolean,
  qrToken: { type: String, unique: true },
  khoaId: String,       // 👈 thêm vào
  khoaTen: String,      // 👈 thêm vào
  dischargedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  historyChanges: [
    {
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: String }, // username hoặc system
      reason: { type: String }, // lý do thay đổi

      // Snapshot trước khi update:
      oldData: {
        caretakerName: String,
        caretakerCCCD: String,
        birthYear: String,
        address: String,
        photoUrls: [String],
        qrToken: String,
        khoaId: String,  
        khoaTen: String, 
      }
    }
  ]
});

module.exports = mongoose.model('Caretaker', CaretakerSchema);
