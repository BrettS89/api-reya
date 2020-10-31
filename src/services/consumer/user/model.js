const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  speaker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'consumer/speaker',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', schema);
