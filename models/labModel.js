const mongoose = require('mongoose');

const LabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  tests: [String],
  rating: Number,
});

module.exports = mongoose.model('Lab', LabSchema);
