const Student = require("../model/student");
const bcrypt = require("bcryptjs");
const redis = require("../utils/redis");


// register student
exports.registerStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    phone,
    address,
    gender,
    enrollmentDate,
  } = req.body;

  //validation
  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !gender ||
    !enrollmentDate
  ) {
    return res.status(400).json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  //email validation
  const getDuplicateEmail = await Student.findOne({ email: email });
  if (getDuplicateEmail) return res.status(400).json({ success: false, error: "Email already exists" });

  //student ID
  const generateRandomId = () => {
    const prefix = "STD";
    const randomNumbers = Math.random().toString().slice(2, 9);
    return `${prefix}${randomNumbers}`;
  };

  const studentID = generateRandomId();

  //password
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  const student = await Student.create({
    firstName,
    lastName,
    studentID,
    dateOfBirth,
    email,
    password: hashedPassword,
    phone,
    address,
    gender,
    enrollmentDate,
  });
  res.status(200).json({
    success: true,
    data: student,
    message: "Student registered successfully",
  });
};

// get all students
exports.getAllStudents = async (req, res) => {
  //pagination
  const limit = 5;
  const page = Number(req.query.page) || 1;

  const startIndex = (page - 1) * limit;

  const students = await Student.find().skip(startIndex).limit(limit);

  //validation
  if (!students) {
    return res.status(400).json({
      success: false,
      error: "No student found",
    });
  }

  res.status(200).json({
    success: true,
    totalResult: students.length,
    data: students,
    message: "Students found successfully",
  });
};

// get student by id
exports.getStudentById = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({ studentID: id });

  //validation
  if (!student) {
    return res.status(400).json({
      success: false,
      error: "No student found",
    });
  }

  res.status(200).json({
    success: true,
    data: student,
    message: "Student found successfully",
  });
};

// update student by id
exports.updateStudentById = async (req, res) => {
  const id = req.params.id;

  const {
    firstName,
    lastName,
    studentID,
    role,
    dateOfBirth,
    email,
    password,
    phone,
    address,
    gender,
    enrollmentDate,
    coursesEnrolled,
  } = req.body;

  //validation
  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !gender ||
    !enrollmentDate
  ) {
    return res.status(400).json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  //email validation
  const getDuplicateEmail = await Student.findOne({ email: email });
  if (getDuplicateEmail) throw "Email already exists...";

  //password
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
  const student = await Student.findOneAndUpdate(
    { studentID: id },
    {
      firstName,
      lastName,
      studentID,
      role,
      dateOfBirth,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      enrollmentDate,
      coursesEnrolled,
    }
  );
  res.status(200).json({
    success: true,
    data: student,
    message: "Student updated successfully",
  });
};

//student self update
exports.studentSelfUpdate = async (req, res) => {
  const studentID = req.user.studentID;
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
    phone,
    address,
    gender,
    coursesEnrolled,
  } = req.body;

  //validation
  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !gender
  ) {
    return res.status(400).json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  //finding student
  const student = await Student.findOneAndUpdate(
    { studentID: studentID },
    {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      phone,
      address,
      gender,
      coursesEnrolled,
    }
  );

  res.status(200).json({
    success: true,
    data: student,
    message: "Student updated successfully",
  });
  res.status(400).json({
    success: false,
    error: "Error in updating student",
  });
};

// delete student by id
exports.deleteStudentById = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOneAndDelete({ studentID: id });

  //validation
  if (!student) {
    return res.status(400).json({
      success: false,
      error: "No student found",
    });
  }
  res.status(200).json({
    success: true,
    data: student,
    message: "Student deleted successfully",
  });
};
