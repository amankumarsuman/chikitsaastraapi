const express = require('express');
const {
  getLabs,
  addLab,
  updateLab,
  deleteLab,
} = require('../controllers/labController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getLabs)
  .post(protect, admin, addLab);

router.route('/:id')
  .put(protect, admin, updateLab)
  .delete(protect, admin, deleteLab);

module.exports = router;
