const express = require("express");
const { sortStudents, sortCourses } = require("../controllers/sort");
const instructorAuth = require("../middleware/instructorAuth");
const cache = require("../middleware/cache");
const sortRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: sort
 *   description: Sorting services
 *
 */

/**
 * @swagger
 * /sort/students:
 *   get:
 *     summary: Sort students
 *     tags: [sort]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by a specific field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: Sorted list of students
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
sortRouter.get("/students", instructorAuth, cache(3000), sortStudents);

/**
 * @swagger
 * /sort/courses:
 *   get:
 *     summary: Sort courses
 *     tags: [sort]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by a specific field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: Sorted list of courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
sortRouter.get("/courses", instructorAuth, cache(3000),sortCourses);

module.exports = sortRouter;
