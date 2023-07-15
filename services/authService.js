const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const Token = require("../models/Token");
const { sendForgotPasswordMail } = require("../utils/email/emailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User does not exist");
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(10));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();
  console.log(user.email + " email");
  const link = `localhost::3001/passwordReset?token=${resetToken}&id=${user._id}`;
  try {
    sendForgotPasswordMail(
      user.email,
      "Password Reset Request",
      { name: user.firstName, link: link },
      "./template/requestResetPassword.handlebars"
    );
  } catch (err) {
    console.log(err.message + " error");
  }

  return link;
};
const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(10));
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  sendForgotPasswordMail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
};
module.exports = { requestPasswordReset, resetPassword };
