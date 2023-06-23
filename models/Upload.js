const mongoose = require("mongoose");

const uploadSchema = new moongose.Schema ({
  birthcert: {
    type: String,
    required: true,
  },
  validId: {
    type: String,
    required: true,
  },
  birthcert: {
    type: String,
    required: true,
  },
  });
  
  module.exports = mongoose.model("Upload", uploadSchema);
