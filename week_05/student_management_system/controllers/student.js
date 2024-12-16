const Student = require("../model/student");

// register student
exports.registerStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
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

  //student ID
  const generateRandomId = () => {
    const prefix = "STD";
    const randomNumbers = Math.random().toString().slice(2, 9);
    return `${prefix}${randomNumbers}`;
  };

  const studentID = generateRandomId();

  const student = await Student.create({
    firstName,
    lastName,
    studentID,
    dateOfBirth,
    email,
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
  const students = await Student.find();

  //validation
  if (!students) {
    return res.status(400).json({
      success: false,
      error: "No student found",
    });
  }

  res.status(200).json({
    success: true,
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

  const student = await Student.findOneAndUpdate(
    { studentID: id },
    {
      firstName,
      lastName,
      studentID,
      role,
      dateOfBirth,
      email,
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
