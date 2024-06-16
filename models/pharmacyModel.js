const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  codAvailable: Boolean,
  drugs: [
    {
      name: String,
      category: String,
    },
  ],
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
