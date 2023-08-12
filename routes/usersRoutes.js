const express = require("express");
const router = express.Router();
const {
  login,
  deleteUserById,
  createUser,
  approveUser,
  declineUser,
  updateUserById,
  getUserById,
  getUsers,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controller/UsersController");
const auth = require("../utils/auth");

router.post("/signup", createUser);
router.post("/login", login);
router.get("/", auth.verifyToken, getUsers);
router.get("/:id", getUserById);
router.patch("/:id", auth.verifyToken, updateUserById);
router.delete("/:id", auth.verifyToken, auth.isAdmin, deleteUserById);
router.patch("/approve/:id", auth.verifyToken, auth.isAdmin, approveUser);
router.patch("/decline/:id", auth.verifyToken, auth.isAdmin, declineUser);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);

module.exports = router;
