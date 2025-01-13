const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app, server } = require("../../index");
const Student = require("../../model/student");
const Course = require("../../model/course");
const Enrollment = require("../../model/enrollment");
const jwt = require("jsonwebtoken");

let mongoServer;
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
});

afterAll(async () => {
  // Disconnect and stop in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

afterEach(async () => {
  // Clear all data after each test
  await Student.deleteMany({});
  await Course.deleteMany({});
  await Enrollment.deleteMany({});
});

describe("POST /enrollments", () => {
  it("should successfully enroll a student in a course", async () => {
    const instructorToken = generateInstructorToken();
    // Create a test student
    const student = await Student.create({
      firstName: "John",
      lastName: "Doe",
      studentID: "STD12345",
      email: "john.doe@example.com",
      dateOfBirth: "2000-01-01",
      password: "password123",
      phone: "1234567890",
      address: "123 Main St",
      gender: "male",
      enrollmentDate: "2025-01-01",
      coursesEnrolled: [],
    });

    // Create a test course
    const course = await Course.create({
      name: "Introduction to Programming",
      code: "CS101",
      description: "A beginner course for programming",
      credits: 3,
      duration: 4,
      instructorID: new mongoose.Types.ObjectId(),
    });

    // Send a request to enroll the student
    const res = await request(app)
      .post("/enrollments/add")
      .set("Authorization", `Bearer ${instructorToken}`)
      .send({
        studentID: student.studentID,
        courseCode: course.code,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("student");
    expect(res.body.data).toHaveProperty("course");
    expect(res.body.message).toBe("Student enrolled successfully");

    // Verify enrollment in the database
    const enrollmentInDb = await Enrollment.findOne({
      student: student._id,
      course: course._id,
    });
    expect(enrollmentInDb).not.toBeNull();

    // Verify the student's coursesEnrolled field is updated
    const updatedStudent = await Student.findById(student._id).populate(
      "coursesEnrolled"
    );
    expect(updatedStudent.coursesEnrolled.length).toBe(1);
    expect(updatedStudent.coursesEnrolled[0]._id.toString()).toBe(
      enrollmentInDb._id.toString()
    );
  });

  it("should return an error if studentID or courseCode is missing", async () => {
    const instructorToken = generateInstructorToken();

    const res = await request(app)
      .post("/enrollments/add")
      .send({})
      .set("Authorization", `Bearer ${instructorToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Student ID and course code are required");
  });

  it("should return an error if the student or course does not exist", async () => {
    const instructorToken = generateInstructorToken();

    const res = await request(app)
      .post("/enrollments/add")
      .send({
        studentID: "STD99999",
        courseCode: "CS999",
      })
      .set("Authorization", `Bearer ${instructorToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Error in getting student or course");
  });
});
