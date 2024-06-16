const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: String,
  speciality: String,
  yearsOfExperience: Number,
  rating: Number,
  qualification: String,
  certificates: String,
  degree: String,
  doctorId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
