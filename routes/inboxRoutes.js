const express = require('express');
const { getInbox } = require('../controllers/inboxController');
const { protect, doctor } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, doctor, getInbox);

module.exports = router;
