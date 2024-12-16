const express = require("express");
const {
  addInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById,
} = require("../controllers/instructor");

const instructorRouter = express.Router();

instructorRouter.post("/add", addInstructor);
instructorRouter.get("/", getAllInstructors);
instructorRouter.get("/:id", getInstructorById);
instructorRouter.put("/update/:id", updateInstructorById);
instructorRouter.delete("/delete/:id", deleteInstructorById);

module.exports = instructorRouter;
