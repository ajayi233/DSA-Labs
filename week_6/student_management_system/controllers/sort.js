const Student = require("../model/student");
const Course = require("../model/course");
const quickSort = require("../sortingAlg/sortStudent");
const {quickSortCourse} = require("../sortingAlg/sortCourse");

exports.sortStudents = async (req, res) => {
  try {
    const { sortBy = "lastName", order = "asc" } = req.query;

    // Fetch all students
    const students = await Student.find();

    const sortedStudents = quickSort(students, sortBy, order);

    res.json(sortedStudents);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong while sorting students." });
  }
};

//sort courses
exports.sortCourses = async (req, res) => { 
  try {
    const { sortBy = "code", order = "asc" } = req.query;

    // Fetch all courses from the database
    const courses = await Course.find();

    // Apply QuickSort based on the selected criteria and order
    const sortedCourses = quickSortCourse(courses, sortBy, order);

    res.json(sortedCourses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong while sorting courses." });
  }
};
