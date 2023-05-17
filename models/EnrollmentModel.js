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

  isApproved: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
 
  birthday: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Enrollees", EnrollmentSchema);
