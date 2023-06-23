const express = require("express");
const router = express.Router();
const multer = require('multer');

const { 
  getAllUploads, 
  createUpload, 
  getById, 
  deleteUpload, 
} = require("../controller/uploadController");

router.post("/", createUpload);

router.get("/", getAllUploads);

router.get("/:id", getById);


router.delete("/:id", deleteUpload);



  module.exports = router;