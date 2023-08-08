const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvent,
  upadateEvent,
  deleteEvent,
  findById
} = require("../controller/eventController");


router.get("/", getEvent);
router.get("/:id", findById);
router.put("/:id", upadateEvent);

router.post("/", createEvent);
router.delete("/:id", deleteEvent);
module.exports = router;
