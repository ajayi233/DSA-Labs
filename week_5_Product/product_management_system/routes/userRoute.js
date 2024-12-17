const express = require("express");
const { adminSignup } = require("../controllers/userControllers/register");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/userControllers/login");
const userRouter = express.Router();

userRouter.post("/signup", adminSignup);
userRouter.post("/login", adminLogin);

userRouter.get("/logout", adminLogout);

module.exports = userRouter;
