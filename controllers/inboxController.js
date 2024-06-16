const Inbox = require('../models/inboxModel');

const getInbox = async (req, res) => {
  const doctorId = req.user._id; // Assuming the doctor is authenticated and req.user contains the doctor info

  try {
    const inboxEntries = await Inbox.find({ doctor: doctorId }).populate('appointment');
    res.json(inboxEntries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getInbox };
