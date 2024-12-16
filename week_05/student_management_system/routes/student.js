const express = require("express");
const {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student");
const studentRouter = express.Router();

//routes for student CRUD
studentRouter.post("/register", registerStudent);
studentRouter.get("/all", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/update/:id", updateStudentById);
studentRouter.delete("/delete/:id", deleteStudentById);

module.exports = studentRouter;
