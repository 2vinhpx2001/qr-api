// models/Passcode.js
const mongoose = require('mongoose');

const PasscodeSchema = new mongoose.Schema({
  code: String, // VD: "123456"
});

module.exports = mongoose.model('Passcode', PasscodeSchema);
