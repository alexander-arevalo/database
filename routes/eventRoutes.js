const express = require("express");
const router = express.Router();
const { 
    createEvent,
    getEvent,
    upadateEvent,
} = require("../controller/eventController");

router.get("/", getEvent);

router.put("/:id", upadateEvent);

module.exports = router;
