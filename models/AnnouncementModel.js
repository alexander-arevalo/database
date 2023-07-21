const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  announcementDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
