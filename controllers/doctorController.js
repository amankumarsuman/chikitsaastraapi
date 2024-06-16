const Doctor = require('../models/doctorModel');

// Helper function to generate a unique doctor ID
const generateDoctorId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    uniqueId = `CHIKITSA${randomNum}`;

    const existingDoctor = await Doctor.findOne({ doctorId: uniqueId });
    if (!existingDoctor) {
      isUnique = true;
    }
  }

  return uniqueId;
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addDoctor = async (req, res) => {
  const { name, gender, speciality, yearsOfExperience, rating, qualification, certificates, degree } = req.body;

  try {
    const doctorId = await generateDoctorId();

    const doctor = new Doctor({
      name,
      gender,
      speciality,
      yearsOfExperience,
      rating,
      qualification,
      certificates,
      degree,
      doctorId,
    });

    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, gender, speciality, yearsOfExperience, rating, qualification, certificates, degree } = req.body;

  try {
    const doctor = await Doctor.findById(id);

    if (doctor) {
      doctor.name = name || doctor.name;
      doctor.gender = gender || doctor.gender;
      doctor.speciality = speciality || doctor.speciality;
      doctor.yearsOfExperience = yearsOfExperience || doctor.yearsOfExperience;
      doctor.rating = rating || doctor.rating;
      doctor.qualification = qualification || doctor.qualification;
      doctor.certificates = certificates || doctor.certificates;
      doctor.degree = degree || doctor.degree;

      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (doctor) {
      await doctor.remove();
      res.json({ message: 'Doctor removed' });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDoctors, addDoctor, updateDoctor, deleteDoctor };
