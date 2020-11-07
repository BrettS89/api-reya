const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  socket_id: {
    type: String,
    required: true,
    index: true,
  },
  app_ids: {
    type: Object,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', schema);
