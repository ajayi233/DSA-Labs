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

/**
 * @swagger
 * tags:
 *   name: instructor
 *
 */

//protected routes

/**
 * @swagger
 * /instructor/add:
 *   post:
 *     summary: Add an instructor
 *     tags: [instructor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       200:
 *         description: Instructor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
instructorRouter.post("/add", instructorAuth, addInstructor);

/**
 * @swagger
 * /instructor:
 *   get:
 *     summary: Get all instructors
 *     tags: [instructor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Instructors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
instructorRouter.get("/", instructorAuth, getAllInstructors);

/**
 * @swagger
 * /instructor/{id}:
 *   get:
 *     summary: Get an instructor by ID
 *     tags: [instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instructor to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instructor'
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
instructorRouter.get("/:id", instructorAuth, getInstructorById);

/**
 * @swagger
 * /instructor/update/{id}:
 *   put:
 *     summary: Update an instructor by ID
 *     tags: [instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instructor to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       200:
 *         description: Instructor updated successfully
 *       400:
 *         description: No instructor found
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
instructorRouter.put("/update/:id", instructorAuth, updateInstructorById);

/**
 * @swagger
 * /instructor/delete/{id}:
 *   delete:
 *     summary: Delete an instructor by ID
 *     tags: [instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the instructor to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 *       400:
 *         description: No instructor found for deletion
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */
instructorRouter.delete("/delete/:id", instructorAuth, deleteInstructorById);

module.exports = instructorRouter;
