const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const {
  addAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  editAnnouncement,
} = require("../controller/announcementController");

router.post("/", auth.verifyToken, auth.isAdmin, addAnnouncement);
router.get("/", auth.verifyToken, auth.isAdmin, getAllAnnouncement);
router.delete("/", auth.verifyToken, auth.isAdmin, deleteAnnouncement);
router.patch("/", auth.verifyToken, auth.isAdmin, editAnnouncement);

module.exports = router;
