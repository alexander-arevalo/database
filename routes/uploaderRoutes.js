const express = require('express')
const {uploadImage} = require('../controller/uploaderController')
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const uploadImg = multer({ storage });
var cloudinary = require("cloudinary").v2
const cloudConfig = require('../config/cloudinaryConfig')


cloudinary.config(
    {
        cloud_name: "dukyzvpsr",
        api_key: "654526152946167",
        api_secret: "TMAOFA8ABhaQ3UoUVGSSYEIPhQ0"
    }
)


router.post('/upload', uploadImg.single('image'), (req,res)=>{
 
    const imageData = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const dataUri = `data:${mimeType};base64,${imageData}`;
    cloudinary.uploader.upload(dataUri,{folder:'uploads'},(error,result)=>{
        console.log("uploading....")
    
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
          } else {
            console.log("successful")
            secureUrl = result.secure_url
            res.status(200).json({url:secureUrl})
          
          }
    })
})


module.exports = router;