const express = require("express");
const {
  addInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById,
} = require("../controllers/instructor");
const instructorAuth = require("../middleware/instructorAuth");

const instructorRouter = express.Router();

//protected routes
instructorRouter.post("/add", instructorAuth, addInstructor);
instructorRouter.get("/", instructorAuth, getAllInstructors);
instructorRouter.get("/:id", instructorAuth, getInstructorById);
instructorRouter.put("/update/:id", instructorAuth, updateInstructorById);
instructorRouter.delete("/delete/:id", instructorAuth, deleteInstructorById);

module.exports = instructorRouter;
