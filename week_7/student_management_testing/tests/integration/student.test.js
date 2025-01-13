const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bodyParser = require("body-parser");
require("dotenv").config();
const { app, server } = require("../../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Import the existing Student model
const Student = require("../../model/student"); // Adjust path to match your project structure

// Integration Test
let mongoServer;
const PATH = "/students/register";

// Mock Instructor Token
const generateInstructorToken = () => {
  const payload = {
    id: "instructor123", // Mocked instructor ID
    role: "instructor", // Instructor role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Mock Student Token (unauthorized user)
const generateStudentToken = () => {
  const payload = {
    id: "student123", // Mocked student ID
    role: "student", // Student role
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  // Set bcrypt salt in the environment variable
  process.env.SALT = 10;
});

afterAll(async () => {
  // Stop the MongoDB server and close the connection
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

afterEach(async () => {
  // Clear all data after each test
  await Student.deleteMany({});
});

describe("POST /register-student", () => {
  it("should register a new student successfully", async () => {
    const instructorToken = generateInstructorToken();
    const studentData = {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2000-01-01",
      email: "john.doe@example.com",
      password: "password123",
      phone: "1234567890",
      address: "123 Main St",
      gender: "male",
      enrollmentDate: "2025-01-01",
    };

    const res = await request(app)
      .post(PATH)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send(studentData);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("studentID");
    expect(res.body.data.firstName).toBe(studentData.firstName);
    expect(res.body.message).toBe("Student registered successfully");

    // Ensure the student is saved in the database
    const studentInDb = await Student.findOne({ email: studentData.email });
    expect(studentInDb).not.toBeNull();
  });

  it("should fail if email already exists", async () => {
    const studentToken = generateInstructorToken();
    const studentData = {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "1999-01-01",
      email: "jane.doe@example.com",
      password: "password123",
      phone: "0987654321",
      address: "456 Another St",
      gender: "female",
      enrollmentDate: "2025-01-01",
      studentID: "student123",
    };

    // Create a student manually in the database
    await Student.create({
      ...studentData,
      password: await bcrypt.hash(
        studentData.password,
        Number(process.env.SALT)
      ),
    });

    const res = await request(app)
      .post(PATH)
      .set("Authorization", `Bearer ${studentToken}`)
      .send(studentData);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Email already exists");
  });

  it("should fail if no token is provided", async () => {
    const studentData = {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2000-01-01",
      email: "john.doe@example.com",
      password: "password123",
      phone: "1234567890",
      address: "123 Main St",
      gender: "male",
      enrollmentDate: "2025-01-01",
    };

    const res = await request(app).post(PATH).send(studentData);
    // Assert that the response status code is 401 (Unauthorized)
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBe("Unauthorized user");
  });

  it("should fail if required fields are missing", async () => {
    const instructorToken = generateInstructorToken();
    const res = await request(app)
      .post(PATH)
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({
        firstName: "Incomplete",
        lastName: "User",
        email: "incomplete.user@example.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Please fill all the fields");
  });
});

describe("GET /students", () => {
  it("should return a paginated list of students successfully", async () => {
    const instructorToken = generateInstructorToken();
    // Seed database with test students
    const students = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        dateOfBirth: "2000-01-01",
        password: "password123",
        phone: "1234567890",
        address: "123 Main St",
        gender: "male",
        enrollmentDate: "2025-01-01",
        studentID: "student123",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        dateOfBirth: "2001-01-01",
        password: "password123",
        phone: "0987654321",
        address: "456 Another St",
        gender: "female",
        enrollmentDate: "2025-01-01",
        studentID: "student456",
      },
      {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice@example.com",
        dateOfBirth: "2002-01-01",
        password: "password123",
        phone: "9876543210",
        address: "789 Third St",
        gender: "female",
        enrollmentDate: "2025-01-01",
        studentID: "student789",
      },
      {
        firstName: "Bob",
        lastName: "White",
        email: "bob@example.com",
        dateOfBirth: "2003-01-01",
        password: "password123",
        phone: "0123456789",
        address: "321 Fourth St",
        gender: "male",
        enrollmentDate: "2025-01-01",
        studentID: "student321",
      },
    ];
    await Student.insertMany(students);

    const res = await request(app)
      .get("/students?page=1")
      .set("Authorization", `Bearer ${instructorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(4); // Paginated limit is 5
    expect(res.body.message).toBe("Students found successfully");
  });

  it("should return an empty list if no students are found", async () => {
    const instructorToken = generateInstructorToken();
    const res = await request(app)
      .get("/students?page=1")
      .set("Authorization", `Bearer ${instructorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(0); // No students in database
    expect(res.body.totalResult).toBe(0); // Total students in database
    expect(res.body.message).toBe("Students found successfully");
  });

  it("should return the second page of students", async () => {
    const instructorToken = generateInstructorToken();
    // Seed database with more than one page of students
    const students = Array.from({ length: 10 }, (_, i) => ({
      firstName: `Student${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `student${i + 1}@example.com`,
      dateOfBirth: "2000-01-01",
      password: "password123",
      phone: "1234567890",
      address: "123 Main St",
      gender: "male",
      enrollmentDate: "2025-01-01",
      studentID: `student${i + 1}`,
    }));
    await Student.insertMany(students);

    const res = await request(app).get("/students?page=2").set("Authorization", `Bearer ${instructorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(5); // Second page also contains 5 students
    expect(res.body.totalResult).toBe(10); // Total students in database
    expect(res.body.message).toBe("Students found successfully");
  });
});
