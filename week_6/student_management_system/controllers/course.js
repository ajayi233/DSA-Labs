const Course = require("../model/course");
const Instructor = require("../model/instructor");
const logger = require("../utils/logger");

//create a new course
exports.addCourse = async (req, res) => {
  logger.info({
    message: "Creating a new course",
    url: req.url,
    method: req.method,
  });
  const { name, code, description, credits, instructorID, duration } = req.body;

  //validation
  if (!name) throw "Course name is required";
  if (!code) throw "Course code is required";
  if (!description) throw "Course description is required";
  if (!credits) throw "Course credits is required";
  if (!instructorID) throw "Course instructor is required";
  if (!duration) throw "Course duration is required";

  const getInstructor = await Instructor.findOne({
    InstructorID: instructorID,
  });
  if (!getInstructor) throw "Instructor not found";
  const InstructorID = getInstructor._id;

  //creating course
  const newCourse = await Course.create({
    name,
    code,
    description,
    credits,
    instructorID: InstructorID,
    duration,
  });

  res.status(200).json({
    status: "success",
    data: {
      newCourse,
    },
    message: "Course created successfully",
  });
};

//get all courses
exports.getAllCourses = async (req, res) => {
  logger.info({
    message: "Getting all courses",
    url: req.url,
    method: req.method,
  });
  const courses = await Course.find();

  //validation
  if (!courses) {
    return res.status(400).json({
      status: "fail",
      error: "No course found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
    message: "Courses found successfully",
  });
};

//get course by id
exports.getCourseById = async (req, res) => {
  logger.info({
    message: "Getting a course",
    url: req.url,
    method: req.method,
  });

  const id = req.params.id;
  const course = await Course.findOne({ code: id });

  //validation
  if (!course) {
    return res.status(400).json({
      status: "fail",
      error: "No course found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
    message: "Course found successfully",
  });
};

//update course by id
exports.updateCourseById = async (req, res) => {
  const id = req.params.id;
  const { name, code, description, credits, instructorID, duration } = req.body;

  //validation
  if (!name) throw "Course name is required...";
  if (!code) throw "Course code is required...";
  if (!description) throw "Course description is required...";
  if (!credits) throw "Course credits is required...";
  if (!instructorID) throw "Course instructor is required...";
  if (!duration) throw "Course duration is required...";

  await Instructor.findOne({ instructorID: instructorID });
  const course = await Course.findOneAndUpdate(
    { code: id },
    {
      name,
      code,
      description,
      credits,
      instructor: Instructor._id,
      duration,
    }
  );

  //validation
  if (!course) {
    return res.status(400).json({
      status: "fail",
      error: "No course found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
    message: "Course updated successfully",
  });
};

//delete course by id
exports.deleteCourseById = async (req, res) => {
  logger.info({
    message: "Creating a new course",
    url: req.url,
    method: req.method,
  });
  const id = req.params.id;
  const course = await Course.findOneAndDelete({ code: id });

  //validation
  if (!course) {
    return res.status(400).json({
      status: "fail",
      error: "No course found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
    message: "Course deleted successfully",
  });
};
