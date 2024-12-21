const express = require("express");
const {
  addEnrollment,
  getAllEnrollments,
  getAllEnrolledStudents,
  deleteEnrollmentById,
  selfEnroll,
} = require("../controllers/enrollment");
const instructorAuth = require("../middleware/instructorAuth");
const studentAuth = require("../middleware/studentAuth");
const cache = require("../middleware/cache");
const enrollmentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: enrollment
 *
 */

/**
 * @swagger
 * /enrollment/add:
 *   post:
 *     summary: Add an enrollment
 *     tags: [enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment added successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

enrollmentRouter.post("/add", instructorAuth, addEnrollment);

/**
 * @swagger
 * /enrollment/self-enroll:
 *   post:
 *     summary: Self-enroll a student
 *     tags: [enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment added successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

enrollmentRouter.post("/self-enroll", studentAuth, selfEnroll);

/**
 * @swagger
 * /enrollment/student/{id}:
 *   get:
 *     summary: Get all enrollments for a student
 *     tags: [enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: Enrollments retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

enrollmentRouter.get(
  "/student/:id",
  instructorAuth,
  cache(3000),
  getAllEnrollments
);

/**
 * @swagger
 * /enrollment/course/{id}:
 *   get:
 *     summary: Get all enrolled students for a course
 *     tags: [enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Enrolled students retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

enrollmentRouter.get(
  "/course/:id",
  instructorAuth,
  cache(3000),
  getAllEnrolledStudents
);

/**
 * @swagger
 * /enrollment/delete/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enrollment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       400:
 *         description: No enrollment found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */

enrollmentRouter.delete("/delete/:id", instructorAuth, deleteEnrollmentById);

module.exports = enrollmentRouter;
