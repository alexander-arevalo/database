const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const userEmail = process.env.EMAIL;
const password = process.env.PASSWORD_EMAIL;
console.log(userEmail + "useremail" + password + "userpassword")
var autoEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail.trim(),
    pass: password.trim(),
  },
});

const sendEmail = async (to, subject, text) => {
  console.log(userEmail + " user Emaill");
  console.log(password + " password");
  let body = {
    from: userEmail,
    to,
    subject,
    text,
  };

  await autoEmail.sendMail(body, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("email sent successfully" + info.response);
    }
  });
};
const sendForgotPasswordMail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    console.log("Sending email forgot password");
    console.log(email, subject, payload, template);
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    console.log(source);
    const options = () => {
      return {
        from: userEmail,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    console.log("dito test")
    // Send email
    await autoEmail.sendMail(options(), (err, info) => {
      console.log("sending")
      if (err) {
        console.log(err.message);
      } else {
        console.log("email sent successfully" + info.response);
      }
    });

    console.log("success");
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { sendEmail, sendForgotPasswordMail };
