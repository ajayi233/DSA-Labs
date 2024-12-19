const express = require("express");
const { sortStudents, sortCourses } = require("../controllers/sort");
const sortRouter = express.Router();

sortRouter.get("/students", sortStudents);
sortRouter.get("/courses", sortCourses);

module.exports = sortRouter;
