const Lab = require('../models/labModel');

const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addLab = async (req, res) => {
  const { name, location, tests, rating } = req.body;

  try {
    const lab = new Lab({
      name,
      location,
      tests,
      rating,
    });

    const createdLab = await lab.save();
    res.status(201).json(createdLab);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateLab = async (req, res) => {
  const { id } = req.params;
  const { name, location, tests, rating } = req.body;

  try {
    const lab = await Lab.findById(id);

    if (lab) {
      lab.name = name || lab.name;
      lab.location = location || lab.location;
      lab.tests = tests || lab.tests;
      lab.rating = rating || lab.rating;

      const updatedLab = await lab.save();
      res.json(updatedLab);
    } else {
      res.status(404).json({ message: 'Lab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteLab = async (req, res) => {
  const { id } = req.params;

  try {
    const lab = await Lab.findById(id);

    if (lab) {
      await lab.remove();
      res.json({ message: 'Lab removed' });
    } else {
      res.status(404).json({ message: 'Lab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getLabs, addLab, updateLab, deleteLab };
