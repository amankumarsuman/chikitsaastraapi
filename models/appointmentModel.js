const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patfname: {
    type: String,
    required: true,
  },
  patlname: {
    type: String,
    required: true,
  },
 patgovid:{
    type:String,
 },
 patinsid:{
    type:String,
 },
 
 patdob:{
    type:String,
    required:true,
 },
 patstate:{
    type:String,
    required:true,
 },
 patcity:{
    type:String,
    required:true,
 },
 patzip:{
    type:String,
    required:true,
 },
 patmobile:{
    type:Number,
    required:true,
 },
 pataddr:{
    type:String,
  
 },
 patage:{
    type:String,
  
 },
 
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
