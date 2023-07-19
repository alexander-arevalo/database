const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const {
  createEvent,
  getEvent,
  upadateEvent,
} = require("../controller/eventController");

router.get("/", getEvent);

router.post("/", auth.verifyToken, auth.isAdmin, createEvent);

router.put("/:id", auth.verifyToken, auth.isAdmin, upadateEvent);

module.exports = router;
