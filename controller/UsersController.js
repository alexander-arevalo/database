const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongodb = require('mongodb');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password,proofOfResidency } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      proofOfResidency
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {

    const { firstName,lastName, email, password } = req.body;
  const id = req.params.id
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(id).then((resp)=>{
      if(!resp){
        res.status(404).send({message:`User with id ${id} is not found`})  
      }
      if(firstName){
        resp.firstName= firstName;
      }
      if(lastName){
        resp.lastName= lastName;
      }
      if(email){
        resp.email = email
      }
      if(password){
        resp.password = hashedPassword;
      }
      resp.save();
      res.status(200).send({message:"User successfully updated!", User:resp})
    })

  
//     const hashedPassword = await bcrypt.hash(password, 10);
// var id = req.params.id
//     // Update the user
//     const user = await User.updateOne(
//       { _id: new mongodb.ObjectId(id) },
//       {
//         $set:{...req.body,hashedPassword}
//       },
  
//     )
//     .then((resp) => {
//       res.status(200).send({resp,message:'User updated successfully'});
//     })
//     .catch((err) => {
//       console.error('Failed to update user:', err);
//       res.status(500).send('Failed to update user');
//     });



   

};

// Delete a user by ID
const deleteUserById = async (req, res) => {

    console.log("starting to delete user");
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id).then(result=>{
      if(!result){
        return res.status(404).send({message:`User with id ${id} is not found`} );

      }else res.send({message:`User with id ${id} is successfully deleted!`})
    }).catch(err=>{

      res.status(500).send
      console.log(err.message)
    })
  
  
  

  
  
};
const approveUser = async(req,res)=>{
const id = req.params.id
const user = await User.findById(id);
if(user.isApproved==null){
  await User.findByIdAndUpdate(id,{isApproved:true},{useFindAndModify:false}).then(resp=>{
    if(!resp){
      res.status(404).send({message:"User not found"})
    }
    res.send({resp,message:`User with id ${id} is successfully approved`})
  }).catch(err=>{
    res.status(500).send({message:err.message});
  })
 
}else if(user.isApproved){
  res.status(401).send({message:"This user is already approved"})
}else{
  res.status(401).send({message:"Bad Request"})
}
  


}

const declineUser = async(req,res)=>{
const id = req.params.id
  const user = await User.findById(id)
  if(user.isApproved==null){
    await User.findByIdAndUpdate(id,{isApproved:false},{useFindAndModify:false}).then(resp=>{
      if(!resp){
        res.status(404).send({message:"User not found"})
      }
      res.send({resp,message:`User with id ${id} is successfully declined`})
    }).catch(err=>{
      res.status(500).send({message:err.message});
    })
  }
  res.status(401).send({message:"something went wrong tinatamad ako"})
 }
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const isAdmin = user.isAdmin;
    const isVerified = user.isApproved;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(
      user.password +
        " this is from database " +
        " this is from body" +
        password
    );
    if (!isPasswordValid&& user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if(user&& !isVerified || isVerified==null){
      return res.status(400).json({ message: "This user is not verified" });
    }
   
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ isAdmin, token,successful:true });
   
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  login,
  deleteUserById,
  createUser,
  approveUser,
  declineUser,
  updateUserById,
  getUserById,
  getUsers,
};