const express = require("express");
const {
  studentLogin,
  instructorLogin,
  resetPassword,
} = require("../controllers/auth");
const studentAuth = require("../middleware/studentAuth");
const instructorAuth = require("../middleware/instructorAuth");

const authRouter = express.Router();

authRouter.post("/student/login", studentLogin);
authRouter.post("/instructor/login", instructorLogin);
authRouter.post("/password-reset", studentAuth, instructorAuth, resetPassword);

module.exports = authRouter;
