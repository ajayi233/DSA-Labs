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
} = require("../controllers/userController");
const { checkParams } = require("../middleware/paramsCheck");

const router = express.Router();

//get requests
//page rendering
router.get("/signup", signupPage);
router.get("/login", loginPage);
router.get("/forgot-password", forgotPasswordPage);
router.get("/reset-password/:token", resetPasswordPage);

// check params middleware

router.get("/admin/:key", checkParams, adminLogin);
router.get("/viewUsers/:key", checkParams, viewAllUsers);

//post requests
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/reset-password/:token", resetPasswordPage);
router.post("/logout", userLogout);

//put requests
router.put("/reset-password/:token", resetPasswordPage);

module.exports = router;
