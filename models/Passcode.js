// models/Passcode.js
const mongoose = require('mongoose');

const PasscodeSchema = new mongoose.Schema({
  code: String, 
});

module.exports = mongoose.model('Passcode', PasscodeSchema);
