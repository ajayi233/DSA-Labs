const express = require("express");
const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course");
const instructorAuth = require("../middleware/instructorAuth");

const courseRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: course
 *
 */

/**
 * @swagger
 * /course/add:
 *   post:
 *     summary: Create a new course
 *     tags: [course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
courseRouter.post("/add", instructorAuth, addCourse);

/**
 * @swagger
 * /course/all:
 *   get:
 *     summary: Get all courses
 *     tags: [course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
courseRouter.get("/", getAllCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       400:
 *         description: No course found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

courseRouter.get("/:id", getCourseById);

/**
 * @swagger
 * /course/update/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: No course found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

courseRouter.put("/update/:id", instructorAuth, updateCourseById);

/**
 * @swagger
 * /course/delete/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: No course found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
courseRouter.delete("/delete/:id", instructorAuth, deleteCourseById);
module.exports = courseRouter;
