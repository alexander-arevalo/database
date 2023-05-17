const express = require("express");
const router = express.Router();
const {
  getAllEnrollees,
  getEnrolleeById,
  addEnrollee,
  updateEnrollee,
  deleteEnrollee,
} = require("../controller/enrollmentController");

router.post("/", addEnrollee);

router.get("/", getAllEnrollees);

router.get("/:id", getEnrolleeById);

router.delete("/:id", deleteEnrollee);
router.patch("/:id/approve", updateEnrollee);

module.exports = router;
