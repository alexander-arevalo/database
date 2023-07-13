const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//NOTE: LAHAT NG REQUIRED KAHIT SA EDIT DAPAT REQUIRED PA RIN ITO 
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isApproved:{
    type:Boolean,
    required:false,
    default:null
  },
  proofOfResidency:{
    type:String,
    required:true,
    
  }, 
  resetToken: String,
  resetTokenExpiration: Date,
});

// Pre middleware to hash password before saving
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(user.password, salt);
//   user.password = hash;
//   next();
// });

module.exports = mongoose.model("User", UserSchema);