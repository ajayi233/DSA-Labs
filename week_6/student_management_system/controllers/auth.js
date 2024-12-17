const Student = require("../model/student");
const Instructor = require("../model/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//student login
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email) throw "Email must be provided...";
  if (!password) throw "Password must be provided...";

  const getStudent = await Student.findOne({ email: email });
  if (!getStudent) throw "Email does not exist...";

  const checkPassword = await bcrypt.compare(password, getStudent.password);
  if (!checkPassword) throw "Email and password does not match...";

  //   console.log(getStudent);

  //jwt bearer token
  const accessToken = await jwt.sign(
    {
      id: getStudent._id,
      studentID: getStudent.studentID,
      role: getStudent.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      accessToken,
    },
    message: "Login successful...",
  });
};

//instructor login
exports.instructorLogin = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email) throw "Email must be provided...";
  if (!password) throw "Password must be provided...";

  const getInstructor = await Instructor.findOne({ email: email });
  if (!getInstructor) throw "Email does not exist...";

  const checkPassword = await bcrypt.compare(password, getInstructor.password);
  if (!checkPassword) throw "Email and password does not match...";

  //jwt bearer token
  const accessToken = await jwt.sign(
    {
      id: getInstructor._id,
      InstructorID: getInstructor.InstructorID,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      accessToken,
    },
    message: "Login successful...",
  });
};

//password reset
exports.resetPassword = async (req, res) => {
  console.log(req.headers);
  const { email } = req.body;

  //validation
  if (!email) throw "Email must be provided...";

  const getInstructor = await Instructor.findOne({ email: email });
  if (!getInstructor) throw "Email does not exist...";

  const getStudent = await Student.findOne({ email: email });
  if (!getStudent) throw "Email does not exist...";

  const token = Math.random() * 1000000;
  console.log(token);
};
