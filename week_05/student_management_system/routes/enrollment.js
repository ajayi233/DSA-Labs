const express = require("express");
const {
  addEnrollment,
  getAllEnrollments,
  getAllEnrolledStudents,
  deleteEnrollmentById,
} = require("../controllers/enrollment");
const enrollmentRouter = express.Router();

enrollmentRouter.post("/add", addEnrollment);
enrollmentRouter.get("/student/:id", getAllEnrollments);
enrollmentRouter.get("/course/:id", getAllEnrolledStudents);
enrollmentRouter.delete("/delete/:id", deleteEnrollmentById);

module.exports = enrollmentRouter;
