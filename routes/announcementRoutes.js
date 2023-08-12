const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const {
  addAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  editAnnouncement,
  findById,
} = require("../controller/announcementController");

router.post("/", auth.verifyToken, addAnnouncement);
router.get("/", auth.verifyToken, getAllAnnouncement);
router.delete("/:id", auth.verifyToken, auth.isAdmin, deleteAnnouncement);
router.post("/:id", auth.verifyToken, auth.isAdmin, editAnnouncement);
router.get("/:id", auth.verifyToken, auth.isAdmin, findById);

module.exports = router;
