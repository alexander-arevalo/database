const mongoose = require("mongoose");

const ReqIdSchema = new mongoose.Schema({
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

  relationship: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  studentPicture: {
    type: String,
    required: true,
  },

  isApproved: {
    type: Boolean,
    default: null,
  },
  fullname: {
    type: String,
    required: true,
  },
  relationship1: {
    type: String,
    required: true,
  },
  phoneNumber2: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  personId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("createId", ReqIdSchema);
