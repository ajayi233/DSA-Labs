const Enrollment = require("../model/enrollment");

//enroll student to course
exports.addEnrollment = async (req, res) => {
  const { studentID, courseCode, enrollmentDate, status } = req.body;

  //validation
  if (!studentID) throw "Student ID is required...";
  if (!courseCode) throw "Course is required...";
  if (!enrollmentDate) throw "Enrollment date is required...";
  if (!status) throw "Status is required...";

  const newEnrollment = await Enrollment.create({
    student: studentID,
    courseCode,
    enrollmentDate,
    status,
  });

  res.status(200).json({
    success: true,
    data: newEnrollment,
    message: "Student enrolled successfully",
  });
};

//get all enrollments of a student
exports.getAllEnrollments = async (req, res) => {
  const studentID = req.params.id;
  const enrollments = await Enrollment.find({ student: studentID });

  //validation
  if (!enrollments) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      enrollments,
    },
    message: "Enrollments found successfully",
  });
};

//get all students enrolled in a course
exports.getAllEnrolledStudents = async (req, res) => {
  const course = req.params.id;
  const enrollments = await Enrollment.find({ course: course });

  //validation
  if (!enrollments) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      enrollments,
    },
    message: "Enrollments found successfully",
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

  res.status(200).json({
    success: true,
    data: enrollment,
    message: "Enrollment deleted successfully",
  });
};
