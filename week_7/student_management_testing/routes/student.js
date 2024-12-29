const express = require("express");
const {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  studentSelfUpdate,
} = require("../controllers/student");
const studentAuth = require("../middleware/studentAuth");
const instructorAuth = require("../middleware/instructorAuth");
const cache = require("../middleware/cache");
const studentRouter = express.Router();

//routes for student CRUD

/**
 * @swagger
 * tags:
 *   name: student
 *   description: Student management system
 */

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a student
 *     tags: [student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student registered successfully
 */
//protected routes
studentRouter.post("/register", instructorAuth, registerStudent);

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     tags: [student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all students
 *       401:
 *         description: Unauthorized access
 */
studentRouter.get("/", instructorAuth,  cache(3000),getAllStudents);

/**
 * @swagger
 * /student/delete/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: No student found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
studentRouter.delete("/delete/:id", instructorAuth, deleteStudentById);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the student
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Student not found
 */
studentRouter.get("/:id", studentAuth, getStudentById);

/**
 * @swagger
 * /student/update/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: No student found
 *       401:
 *         description: Unauthorized access
 */
studentRouter.put("/update/:id", instructorAuth, updateStudentById);

/**
 * @swagger
 * /student/self-update:
 *   put:
 *     summary: Update a student's own information
 *     tags: [student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

studentRouter.put("/self-update", studentAuth, studentSelfUpdate);

module.exports = studentRouter;
