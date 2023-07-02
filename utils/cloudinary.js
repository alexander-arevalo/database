var cloudinary = require("cloudinary").v2
const cloudConfig = require('../config/cloudinaryConfig')

cloudinary.config(
    {
        cloud_name: cloudConfig.cloudAPI_NAME,
        api_key: cloudConfig.cloudAPI_KEY,
        api_secret: cloudConfig.cloudAPI_SECRET
    }
)
const opts = {
    overwrite:true,
    invalidate:true,
    resource_type:"auto"
}

module.exports= (img)=>{

    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(img,opts,(error,result)=>{
            if(result && result.secure_url){
                console.log(result.secure_url);
                return resolve(result.secure_url)
            }
            console.log(error.message)
            return reject({message: error.message})
        })
    })
}
