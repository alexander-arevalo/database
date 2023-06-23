const Enrollee = require("../models/EnrollmentModel");

const getAllEnrollees = async (req, res) => {
  try {
    const enrollees = await Enrollee.find();
    res.json(enrollees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEnrolleeById = async (req, res) => {
  try {
    const enrollee = await Enrollee.findById(req.params.id);
    if (enrollee) {
      res.json(enrollee);
    } else {
      res.status(404).json({ message: "Enrollee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEnrollee = async (req, res) => {

  const enrollee = new Enrollee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    relationship: req.body.relationship,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
  });

  try {
    const newEnrollee = await enrollee.save();
    res.status(201).json(newEnrollee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEnrollee = async (req, res) => {
  try {
    const enrollee = await Enrollee.findById(req.params.id);
    if (enrollee) {
      enrollee.isApproved = true;
      await enrollee.save();
      res.json(enrollee);
    } else {
      res.status(404).json({ message: "Enrollee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEnrollee = async (req, res) => {
  try {
    const enrollee = await Enrollee.findById(req.params.id);
    if (enrollee) {
      await enrollee.remove();
      res.json({ message: "Enrollee deleted" });
    } else {
      res.status(404).json({ message: "Enrollee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEnrollees,
  getEnrolleeById,
  addEnrollee,
  updateEnrollee,
  deleteEnrollee,
};
