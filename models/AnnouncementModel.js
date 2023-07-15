const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  announcementDate: {
    type: String,
    required: true,
  },
  announcementDescription:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
