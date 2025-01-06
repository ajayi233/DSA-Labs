const Instructor = require("../model/instructor");
const bcrypt = require("bcryptjs");

//add new instructor
exports.addInstructor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    phone,
    address,
    hireDate,
    department,
  } = req.body;

  //validation
  if(!firstName || !lastName || !email || !password || !dateOfBirth || !phone || !address || !hireDate || !department) return res.status(400).json({success: false, error: "Please fill all the fields"});

  //email validation
  const getDuplicateEmail = await Instructor.findOne({ email: email });
  if (getDuplicateEmail) return res.status(400).json({success: false, error: "Email already exists"});

  const generateRandomId = () => {
    const prefix = "INSTR";
    const randomNumbers = Math.random().toString().slice(2, 9);
    return `${prefix}${randomNumbers}`;
  };

  const instructorID = generateRandomId();
  // console.log(instructorID);

  //password encryption
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  const newInstructor = await Instructor.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    InstructorID: instructorID,
    dateOfBirth,
    phone,
    address,
    hireDate,
    coursesTaught: [],
    department,
  });
  res.status(200).json({
    success: true,
    data: {
      instructor: newInstructor,
    },
    message: "Instructor created successfully",
  });
};

//get all instructors
exports.getAllInstructors = async (req, res) => {
  const instructors = await Instructor.find(req.query);

  //validation
  if (!instructors) {
    return res.status(400).json({
      success: false,
      error: "No instructors found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      instructors,
    },
    message: "Instructors found successfully",
  });
};

//get instructor by id
exports.getInstructorById = async (req, res) => {
  const id = req.params.id;
  const instructor = await Instructor.findOne({ InstructorID: id });

  //validation
  if (!instructor) {
    return res.status(400).json({
      success: false,
      error: "No instructor found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      instructor,
    },
    message: "Instructor found successfully",
  });
};

//update instructor by id
exports.updateInstructorById = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    phone,
    address,
    hireDate,
    department,
  } = req.body;

  //validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dateOfBirth ||
    !phone ||
    !address ||
    !hireDate ||
    !department
  ) {
    return res.status(400).json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  //password encryption
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  //update instructor
  const instructor = await Instructor.findOneAndUpdate(
    { InstructorID: id },
    {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      phone,
      address,
      hireDate,
      coursesTaught: [],
      department,
    }
  );

  //validation
  if (!instructor) {
    return res.status(400).json({
      success: false,
      error: "No instructor found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      instructor,
    },
    message: "Instructor updated successfully",
  });
};

//delete instructor by id
exports.deleteInstructorById = async (req, res) => {
  const id = req.params.id;
  const instructor = await Instructor.findOneAndDelete({ InstructorID: id });

  //validation
  if (!instructor) {
    return res.status(400).json({
      success: false,
      error: "No instructor found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      instructor,
    },
    message: "Instructor deleted successfully",
  });
};
