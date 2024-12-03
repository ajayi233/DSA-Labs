const express = require("express");
const {
  registerUser,
  signupPage,
  loginPage,
  forgotPasswordPage,
  resetPasswordPage,
  userLogin,
  userLogout,
  adminLogin,
  viewAllUsers,
  usersHome,
} = require("../controllers/userController");
const { checkParams } = require("../middleware/paramsCheck");

const router = express.Router();

//get requests
//page rendering
router.get("/signup", signupPage);
router.get("/login", loginPage);
router.get("/forgot-password", forgotPasswordPage);
router.get("/reset-password", resetPasswordPage);
router.get("/userHome", usersHome);

// check params middleware

router.get("/adminHome", adminLogin);
router.get("/viewUsers/:key", checkParams, viewAllUsers);

//post requests
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/reset-password", resetPasswordPage);
router.post("/logout", userLogout);

//patch requests
router.patch("/reset-password/:token", resetPasswordPage);

module.exports = router;
