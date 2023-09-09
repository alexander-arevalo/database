const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,

    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 8,
  },

  relationship: {
    type: String,
    required: true,
  },
  yearLevel: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  birthDate: {
    type: String,
    required: true,
  },
  birthCert: {
    type: String,
    required: false,
  },
  healthRecord: {
    type: String,
    required: false,
  },
  validId: {
    type: String,
    required: false,
  },
  userID: {
    type: String,
    required: true,
  },
  submittedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Enrollees", EnrollmentSchema);
