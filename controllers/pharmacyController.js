const Pharmacy = require('../models/pharmacyModel');

const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addPharmacy = async (req, res) => {
  const { name, location, codAvailable, drugs } = req.body;

  try {
    const pharmacy = new Pharmacy({
      name,
      location,
      codAvailable,
      drugs,
    });

    const createdPharmacy = await pharmacy.save();
    res.status(201).json(createdPharmacy);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePharmacy = async (req, res) => {
  const { id } = req.params;
  const { name, location, codAvailable, drugs } = req.body;

  try {
    const pharmacy = await Pharmacy.findById(id);

    if (pharmacy) {
      pharmacy.name = name || pharmacy.name;
      pharmacy.location = location || pharmacy.location;
      pharmacy.codAvailable = codAvailable || pharmacy.codAvailable;
      pharmacy.drugs = drugs || pharmacy.drugs;

      const updatedPharmacy = await pharmacy.save();
      res.json(updatedPharmacy);
    } else {
      res.status(404).json({ message: 'Pharmacy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePharmacy = async (req, res) => {
  const { id } = req.params;

  try {
    const pharmacy = await Pharmacy.findById(id);

    if (pharmacy) {
      await pharmacy.remove();
      res.json({ message: 'Pharmacy removed' });
    } else {
      res.status(404).json({ message: 'Pharmacy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPharmacies, addPharmacy, updatePharmacy, deletePharmacy };
