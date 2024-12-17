const Enrollment = require("../model/enrollment");
const Student = require("../model/student");
const Course = require("../model/course");

//enroll student to course
exports.addEnrollment = async (req, res) => {
  const { studentID, courseCode } = req.body;

  //validation
  if (!studentID) throw "Student ID is required...";
  if (!courseCode) throw "Course is required...";

  const getStudent = await Student.findOne({ studentID: studentID });
  const getCourse = await Course.findOne({ code: courseCode });

  if (!getCourse || !getStudent) throw "Error in getting student or course...";

  const newEnrollment = await Enrollment.create({
    student: getStudent._id,
    course: getCourse._id,
  });

  getStudent.enrollments.push(newEnrollment._id);
  await getStudent.save();

  res.status(200).json({
    success: true,
    data: newEnrollment,
    message: "Student enrolled successfully",
  });
};

//get all enrollments of a student
exports.getAllEnrollments = async (req, res) => {
  const studentID = req.params.id;
  const getStudent = await Student.findOne({ studentID: studentID });

  const enrollments = await Enrollment.find({ student: getStudent._id });

  //validation
  if (!enrollments) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }

  //finding courses that have been referenced in enrollments
  const getCourses = await Course.find({
    _id: { $in: enrollments.map((enrollment) => enrollment.course) },
  });

  // storing course names in an array for readability
  try {
    const courses = [];
    courses.push(getCourses[0].code);
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
    message: `Enrollments for ${getStudent.firstName} ${getStudent.lastName} found successfully`,
  });
};

//get all students enrolled in a course
exports.getAllEnrolledStudents = async (req, res) => {
  const course = req.params.id;
  const getCourse = await Course.findOne({ code: course });
  const enrollments = await Enrollment.find({ course: getCourse._id });

  //validation
  if (!enrollments) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }

  const enrolledStudents = await Student.find({
    _id: { $in: enrollments.map((enrollment) => enrollment.student) },
  });

  res.status(200).json({
    status: "success",
    data: {
      enrolledStudents,
    },
    message: `Students enrolled for ${getCourse.code} found successfully`,
  });
};

//delele enrollment by id
exports.deleteEnrollmentById = async (req, res) => {
  const id = req.params.id;
  const enrollment = await Enrollment.findByIdAndDelete(id);

  //validation
  if (!enrollment) {
    return res.status(404).json({
      success: false,
      error: "No enrollment found",
    });
  }

  const getStudent = await Student.findOne({ _id: enrollment.student });
  getStudent.coursesEnrolled.pop(enrollment._id);
  await getStudent.save();

  res.status(200).json({
    success: true,
    data: enrollment,
    message: "Enrollment deleted successfully",
  });
};
