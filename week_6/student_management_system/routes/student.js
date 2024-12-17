const express = require("express");
const {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student");
const studentAuth = require("../middleware/studentAuth");
const instructorAuth = require("../middleware/instructorAuth");
const studentRouter = express.Router();

//routes for student CRUD

//protected routes
studentRouter.post("/register", instructorAuth, registerStudent);
studentRouter.get("/", instructorAuth, getAllStudents);
studentRouter.delete("/delete/:id", instructorAuth, deleteStudentById);

//protected route for students
// studentRouter.use(studentAuth);
// studentRouter.use(instructorAuth);
studentRouter.get("/:id", studentAuth, instructorAuth, getStudentById);
studentRouter.put(
  "/update/:id",
  studentAuth,
  instructorAuth,
  updateStudentById
);

module.exports = studentRouter;
