const express = require("express");
const router = express.Router();
const { 
    createEvent,
    getEvent,
    upadateEvent,
} = require("../controller/eventController");

router.post("/", createEvent);

router.get("/", getEvent);

router.put("/:id", upadateEvent);

module.exports = router;

