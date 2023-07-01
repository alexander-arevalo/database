const multer = require('multer');
const Upload = require("../models/Upload")

//storage

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb){
    cb(null,file.originalname)
  }
});

// const upload = multer ({storage: storage}).single('sampleimage');

const createUplaod = async (req, res) => {
  let birthcert = req.body.birthcert
  let validId = req.body.validId
  let certificate = req.body.certificate
  const upload = new Upload({birthcert, validId, certificate});
  try {
    const newCreateUpload = upload.save();
    res.status(201).json({message: "Succesfully Uploaded", newCreateUpload });
  } catch (error) {
    res.status(500),json({message: "Something Went Wrong", error})
  }

}


module.exports = {
  getAllUploads, 
  createUpload, 
  getById, 
  deleteUpload, 
};
