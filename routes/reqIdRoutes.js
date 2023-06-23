const express = require("express");
const router = express.Router();
const multer = require('multer');
const { 
    createId, 
    getAll,
    getId, 
} = require("../controller/reqIdController");

router.post("/", createId);

router.get("/", getAll);

router.get("/:id", getId);

  module.exports = router;