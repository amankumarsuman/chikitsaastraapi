const express = require('express');
const {
  getPharmacies,
  addPharmacy,
  updatePharmacy,
  deletePharmacy,
} = require('../controllers/pharmacyController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getPharmacies)
  .post(protect, admin, addPharmacy);

router.route('/:id')
  .put(protect, admin, updatePharmacy)
  .delete(protect, admin, deletePharmacy);

module.exports = router;
