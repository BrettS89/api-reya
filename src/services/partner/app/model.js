const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  app_store_link: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  mobile_link: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  requires_mobile: {
    type: Boolean,
  },
  short_description: {
    type: String,
    required: true,
  },
  subscribe_uri: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  unsubscribe_uri: {
    type: String,
  }
}, {
  timestamps: true
});

schema.index({ active: 1, subscribers: -1 });

module.exports = mongoose.model('App', schema);
