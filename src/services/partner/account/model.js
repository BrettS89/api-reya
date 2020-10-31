const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Account', schema);
