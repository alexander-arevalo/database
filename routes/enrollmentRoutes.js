const express = require("express");
const router = express.Router();
const {
  getAllEnrollees,
  getEnrolleeById,
  addEnrollee,
  updateEnrollee,
  deleteEnrollee,
  declineEnrolee,
  remarkEnrollee,
} = require("../controller/enrollmentController");

router.post("/", addEnrollee);

router.get("/", getAllEnrollees);

router.get("/:id", getEnrolleeById);

router.delete("/:id", deleteEnrollee);
router.patch("/approve/:id", updateEnrollee);
router.patch("/decline/:id", declineEnrolee);
router.patch("/remark/:id", remarkEnrollee);

module.exports = router;
