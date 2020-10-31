const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  app_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

schema.index({ user_id: -1, app_id: -1 });

module.exports = mongoose.model('AppSub', schema);
