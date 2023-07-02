const upload = require('../utils/cloudinary')

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

const uploadImage= (req,res)=>{
    // let imgUpload= base64Converter(req.body.image)
upload(req.body.image).then((resp)=>{
    res.send(resp)
}).catch((err)=>{res.status(500).send({message:err.message})})
}

module.exports = {uploadImage};
