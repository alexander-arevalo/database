const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const verifyToken = async (req, res, next) => {
  const tokenFromHeader = req.headers.authorization;
  const token = tokenFromHeader.split(" ")[1];
  if(!tokenFromHeader) {
    return res.status(401).json({ message: "Token cannot be null" });
  }


  console.log(token + " token")
  console.log("SECRET KEY = : "+ process.env.JWT_SECRET)


  try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" here "+ decodedToken)
    const user = await User.findById(decodedToken.userId);

    if(!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("HULI KA!")
    return res.status(401).json({ message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    console.log("it is admin! nice!")
    next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { verifyToken, isAdmin };
