const Appointment = require('../models/appointmentModel');
const Inbox = require('../models/inboxModel');
const Counter = require('../models/counterModel');

const bookAppointment = async (req, res) => {
  const {
    doctorId,
    appointmentDate,
    appointmentTime,
    patfname,
    patlname,
    patgovid,
    patinsid,
    patdob,
    patstate,
    patcity,
    patzip,
    patmobile,
    pataddr,
    patage,
  } = req.body;

  try {
    // Get the next appointment ID
    const counter = await Counter.findOneAndUpdate(
      { id: 'appointmentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const appointmentId = `APPT-${String(counter.seq).padStart(6, '0')}`;

    const appointment = new Appointment({
      appointmentId, // Add the generated appointment ID
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      patfname,
      patlname,
      patgovid,
      patinsid,
      patdob,
      patstate,
      patcity,
      patzip,
      patmobile,
      pataddr,
      patage,
    });

    const createdAppointment = await appointment.save();

    // Create an inbox entry for the doctor
    const inboxEntry = new Inbox({
      doctor: doctorId,
      appointment: createdAppointment._id,
    });

    await inboxEntry.save();

    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookAppointment };
