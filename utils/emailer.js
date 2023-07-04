const nodemailer = require('nodemailer');

const userEmail = process.env.EMAIL
const password = process.env.PASSWORD_EMAIL
var autoEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marsdaycare3@gmail.com',
      pass: 'zruofombvdlvjvpt'  
    }
  });

const sendEmail = async(to,subject,text)=>{
    console.log(userEmail + " user Emaill")
    console.log(password + " password")
    let body ={
        from: userEmail,
        to,
        subject,
        text
    }

  await autoEmail.sendMail(body,(err,info)=>{
if(err){
    console.log(err.message)
}else{
    console.log("email sent successfully"+ info.response)
}
    })
}






module.exports = sendEmail;