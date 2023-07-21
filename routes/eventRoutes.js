const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvent,
  upadateEvent,
  findById,
} = require("../controller/eventController");

router.post("/", createEvent);

router.get("/", getEvent);

router.put("/:id", upadateEvent);
router.get("/:id", findById);

module.exports = router;
