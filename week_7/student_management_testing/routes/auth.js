const express = require("express");
const {
  studentLogin,
  instructorLogin,
  resetPassword,
} = require("../controllers/auth");
const studentAuth = require("../middleware/studentAuth");
const instructorAuth = require("../middleware/instructorAuth");
const cache = require("../middleware/cache");

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: auth
 */

/**
 * @swagger
 * /auth/student/login:
 *   post:
 *     summary: Student login
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Student logged in successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

authRouter.post("/student/login", cache(3000), studentLogin);

/**
 * @swagger
 * /auth/instructor/login:
 *   post:
 *     summary: Instructor login
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Instructor logged in successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

authRouter.post("/instructor/login", cache(3000), instructorLogin);

/**
 * @swagger
 * /auth/password-reset:
 *   post:
 *     summary: Reset password
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

authRouter.post("/password-reset", studentAuth, instructorAuth, resetPassword);

module.exports = authRouter;
