const express = require('express');
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(protect, admin, addDoctor);

router.route('/:id')
  .put(protect, admin, updateDoctor)
  .delete(protect, admin, deleteDoctor);

module.exports = router;
