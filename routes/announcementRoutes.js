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

router.post("/", auth.verifyToken, auth.isAdmin, addAnnouncement);
router.get("/", getAllAnnouncement);
router.delete("/:id", auth.verifyToken, auth.isAdmin, deleteAnnouncement);
router.post("/:id", auth.verifyToken, auth.isAdmin, editAnnouncement);
router.get("/:id", auth.verifyToken, auth.isAdmin, findById);

module.exports = router;
