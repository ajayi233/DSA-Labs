const express = require("express");
const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.post("/add", addCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.put("/update/:id", updateCourseById);
courseRouter.delete("/delete/:id", deleteCourseById);
module.exports = courseRouter;
