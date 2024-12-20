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
  if (!firstName) throw "Instructor first name is required...";
  if (!lastName) throw "Instructor last name is required...";
  if (!email) throw "Instructor email is required...";
  if (!password) throw "Instructor password is required...";
  if (!dateOfBirth) throw "Instructor date of birth is required...";
  if (!phone) throw "Instructor phone is required...";
  if (!address) throw "Instructor address is required...";
  if (!hireDate) throw "Instructor hire date is required...";
  if (!department) throw "Instructor department is required...";

  //email validation
  const getDuplicateEmail = await Instructor.findOne({ email: email });
  if (getDuplicateEmail) throw "Email already exists...";

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
    status: "success",
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
      status: "fail",
      error: "No instructors found",
    });
  }

  res.status(200).json({
    status: "success",
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
      status: "fail",
      error: "No instructor found",
    });
  }

  res.status(200).json({
    status: "success",
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
      status: "fail",
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
      status: "fail",
      error: "No instructor found",
    });
  }

  res.status(200).json({
    status: "success",
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
      status: "fail",
      error: "No instructor found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      instructor,
    },
    message: "Instructor deleted successfully",
  });
};
