
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadImg = multer({ storage });
var cloudinary = require("cloudinary").v2
const cloudConfig = require('../config/cloudinaryConfig')


cloudinary.config(
    {
        cloud_name: cloudConfig.cloudAPI_NAME,
        api_key: cloudConfig.cloudAPI_KEY,
        api_secret: cloudConfig.cloudAPI_SECRET
    }
)
// const base64Converter = (file)=>{
//     return new Promise((resolve,reject)=>{
//         try{
//             const fileReader = new FileReader();

//             fileReader.readAsDataURL(file);
    
//             fileReader.onload=()=>{
//                 resolve(fileReader.result);
//             }
//             fileReader.onerror=(err)=>{
//                 reject(err.message);
//             }
//         }catch(err){
//             console.log(err.message)
//         }
       
//     })
// }

const uploadImage= ()=>{
    // let imgUpload= base64Converter(req.body.image)
    let secureUrl
    console.log("entering uploadImage function")
uploadImg.single('image'), (req,res)=>{
    cloudinary.uploader.upload(req.file.image,{folder:'uploads'},(error,result)=>{
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
}

}




module.exports = {uploadImage}
