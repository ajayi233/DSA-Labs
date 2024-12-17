const express = require("express");
const {
  addEnrollment,
  getAllEnrollments,
  getAllEnrolledStudents,
  deleteEnrollmentById,
} = require("../controllers/enrollment");
const instructorAuth = require("../middleware/instructorAuth");
const enrollmentRouter = express.Router();

enrollmentRouter.post("/add", instructorAuth, addEnrollment);
enrollmentRouter.get("/student/:id", instructorAuth, getAllEnrollments);
enrollmentRouter.get("/course/:id", instructorAuth, getAllEnrolledStudents);
enrollmentRouter.delete("/delete/:id", instructorAuth, deleteEnrollmentById);

module.exports = enrollmentRouter;
