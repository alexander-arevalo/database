const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  galleryPicture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gallery", GallerySchema);
