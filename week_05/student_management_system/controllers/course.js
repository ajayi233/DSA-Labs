const Course = require("../model/course");

//create a new course
exports.addCourse = async (req, res) => {
  const { name, code, description, credits, instructor, duration } = req.body;

  //validation
  if (!name) throw "Course name is required...";
  if (!code) throw "Course code is required...";
  if (!description) throw "Course description is required...";
  if (!credits) throw "Course credits is required...";
  if (!instructor) throw "Course instructor is required...";
  if (!duration) throw "Course duration is required...";

  const newCourse = await Course.create({
    name,
    code,
    description,
    credits,
    instructor,
    duration,
  });
  res.status(200).json({
    status: "success",
    data: {
      course: newCourse,
    },
    message: "Course created successfully",
  });
};

//get all courses
exports.getAllCourses = async (req, res) => {
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
  const { name, code, description, credits, instructor, duration } = req.body;

  //validation
  if (!name) throw "Course name is required...";
  if (!code) throw "Course code is required...";
  if (!description) throw "Course description is required...";
  if (!credits) throw "Course credits is required...";
  if (!instructor) throw "Course instructor is required...";
  if (!duration) throw "Course duration is required...";

  const course = await Course.findOneAndUpdate(
    { code: id },
    {
      name,
      code,
      description,
      credits,
      instructor,
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
