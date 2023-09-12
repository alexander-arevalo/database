const Enrollee = require("../models/EnrollmentModel");
<<<<<<< HEAD
<<<<<<< HEAD
const { sendForgotPasswordMail } = require("../utils/email/emailer");
=======
const sendEmail = require("../utils/emailer");
>>>>>>> f538f6fcf8e0256996f2e3b17de1d640f96645de
=======
const sendEmail = require("../utils/emailer");
>>>>>>> f538f6fcf8e0256996f2e3b17de1d640f96645de

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
    yearLevel: req.body.yearLevel,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    validId: req.body.validId,
    birthCert: req.body.birthCert,
    healthRecord: req.body.healthRecord,
    userID: req.body.userId,
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
    const { firstName, email, lastName } = enrollee;
    const subject = "Enrollment request approved";
    const template = "./template/approveEnrollment.handlebars";
    if (enrollee) {
      enrollee.isApproved = true;
      await enrollee.save();
      sendForgotPasswordMail(email, subject, { firstName, lastName }, template);
      res.json(enrollee);
    } else {
      res.status(404).json({ message: "Enrollee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const declineEnrolee = async (req, res) => {
  try {
    const enrollee = await Enrollee.findById(req.params.id);
    if (enrollee && enrollee.isApproved == null) {
      enrollee.isApproved = false;
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

const remarkEnrollee = async (req, res) => {
  try {
    const enrollee = await Enrollee.findById(req.params.id);
    if (enrollee) {
      await enrollee.remark();
      res.json({ message: "Updated remarks" });
    } else {
      res.status(404).json({ message: "Error" });
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
  declineEnrolee,
  remarkEnrollee,
};
