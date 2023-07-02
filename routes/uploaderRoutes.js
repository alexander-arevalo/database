const express = require('express')
const {uploadImage} = require('../controller/uploaderController')
const router = express.Router();



router.post('/upload', uploadImage)


module.exports = router;