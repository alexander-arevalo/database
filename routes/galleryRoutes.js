const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const {
  addGallery,
  editGallery,
  getAllGallery,
  getGalleryById,
  deleteGallery,
} = require("../controller/galleryController");

router.get("/", getAllGallery);
router.get("/:id", getGalleryById);
router.post("/", auth.verifyToken, auth.isAdmin, addGallery);
router.patch("/:id", auth.verifyToken, auth.isAdmin, editGallery);
router.delete("/:id", auth.verifyToken, auth.isAdmin, deleteGallery);

module.exports = router;
