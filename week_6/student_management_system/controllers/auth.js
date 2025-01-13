const Student = require("../model/student");
const Instructor = require("../model/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//student login
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password)
    return res.status(400).json({ message: "Missing email or password" });

  const getStudent = await Student.findOne({ email: email });
  if (!getStudent)
    return res.status(400).json({ message: "Email does not exist" });

  const checkPassword = await bcrypt.compare(password, getStudent.password);
  if (!checkPassword)
    return res
      .status(400)
      .json({ message: "Email and password does not match" });

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
    message: "Login successful",
  });
};

//instructor login
exports.instructorLogin = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password)
    return res.status(400).json({ message: "Missing email or password" });

  const getInstructor = await Instructor.findOne({ email: email });
  if (!getInstructor)
    return res.status(400).json({ message: "Email does not exist" });

  const checkPassword = await bcrypt.compare(password, getInstructor.password);
  if (!checkPassword)
    return res
      .status(400)
      .json({ message: "Email and password does not match..." });

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
    message: "Login successful",
  });
};

//password reset
exports.resetPassword = async (req, res) => {
  const { password, newPassword } = req.body;

  //validation
  if (!password || !newPassword || password !== newPassword)
    return res
      .status(400)
      .json({ message: "All fields are required and password must match" });

  const person = req.user.id;

  if (!person) {
    return res.status(400).json({
      status: "fail",
      message: "User not found",
    });
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  await Student.findByIdAndUpdate(person, {
    password: hashedPassword,
  });
  await Instructor.findByIdAndUpdate(person, {
    password: hashedPassword,
  });

  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
};