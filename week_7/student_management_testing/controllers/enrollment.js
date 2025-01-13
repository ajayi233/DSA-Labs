const Enrollment = require("../model/enrollment");
const Student = require("../model/student");
const Course = require("../model/course");

//enroll student to course
exports.addEnrollment = async (req, res) => {
  const { studentID, courseCode } = req.body;

  //validation
  if(!studentID || !courseCode){
    return res.status(400).json({
      success: false,
      error: "Student ID and course code are required",
    });
  }

  const getStudent = await Student.findOne({ studentID: studentID });
  const getCourse = await Course.findOne({ code: courseCode });

  if (!getCourse || !getStudent) return res.status(400).json({
    success: false,
    error: "Error in getting student or course",
  });

 
  const newEnrollment = await Enrollment.create({
    student: getStudent._id,
    course: getCourse._id,
  });

  getStudent.coursesEnrolled.push(newEnrollment._id);
  await getStudent.save();

  res.status(200).json({
    success: true,
    data: newEnrollment,
    message: "Student enrolled successfully",
  });
};

//student self enroll to course
exports.selfEnroll = async (req, res) => {
  const { courseCode } = req.body;
  const studentID = req.user;

  //validation
  const getStudent = await Student.findOne({ studentID: studentID.studentID });
  const getCourse = await Course.findOne({ code: courseCode });

  if (!getCourse || !getStudent) throw "Error in getting student or course";
  const similarEnrollment = await Enrollment.findOne({
    student: getStudent._id,
    course: getCourse._id,
  });
  if (similarEnrollment) {
    res.status(400).json({
      success: false,
      error: "You have already been enrolled to this course",
    });
  } else {
    const newEnrollment = await Enrollment.create({
      student: getStudent.id,
      course: getCourse._id,
    });

    getStudent.coursesEnrolled.push(newEnrollment._id);
    await getStudent.save();

    res.status(200).json({
      success: true,
      data: newEnrollment,
      message: `You have successfully enrolled to ${getCourse.code}`,
    });
  }
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
    res.status(200).json({
      status: "success",
      data: {
        courses,
      },
      message: `Enrollments for ${getStudent.firstName} ${getStudent.lastName} found successfully`,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      error: "No enrollments found",
    });
  }
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
