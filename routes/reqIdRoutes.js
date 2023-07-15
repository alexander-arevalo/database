const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  requestStudentId,
  getAll,
  getId,
  approveIdRequest,
} = require("../controller/reqIdController");

router.post("/", requestStudentId);

router.get("/", getAll);

router.get("/:id", getId);
router.patch("/:id", approveIdRequest);

module.exports = router;
