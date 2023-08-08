const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  requestStudentId,
  getAll,
  getId,
  approveIdRequest,
  declinedRequest
} = require("../controller/reqIdController");

router.post("/", requestStudentId);

router.get("/", getAll);

router.get("/:id", getId);
router.patch("/approve/:id", approveIdRequest);
router.patch("/decline/:id",declinedRequest)

module.exports = router;
