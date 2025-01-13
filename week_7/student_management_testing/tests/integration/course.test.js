const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app, server } = require("../../index"); // Adjust path as needed
const Course = require("../../model/course");
const Instructor = require("../../model/instructor");
const jwt = require("jsonwebtoken");

let mongoServer;
const PATH = "/courses/add";

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
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

beforeEach(async () => {
  await Course.deleteMany({});
  await Instructor.deleteMany({});
});

describe("Course API enrollment processes", () => {
  let instructorId;
  const testInstructor = {
    InstructorID: "INS123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    department: "Computer Science",
    password: "password123",
    hireDate: "2021-01-01",
    address: "123 Main Street",
    phone: "1234567890",
    dateOfBirth: "1990-01-01",
  };

  const testCourse = {
    name: "Advanced Programming",
    code: "CS501",
    description: "Advanced programming concepts and practices",
    credits: 3,
    duration: 4,
    instructorID: new mongoose.Types.ObjectId(),
  };

  beforeEach(async () => {
    // Create a test instructor first
    const instructor = await Instructor.create(testInstructor);
    instructorId = instructor.InstructorID;
  });

  describe("POST /api/courses", () => {
    test("should create a new course successfully", async () => {
      const instructorToken = generateInstructorToken();

      const response = await request(app)
        .post(PATH)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({
          ...testCourse,
          instructorID: instructorId,
        })
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data.newCourse.name).toBe(testCourse.name);
      expect(response.body.data.newCourse.code).toBe(testCourse.code);
    });

    test("should fail to create course with missing fields", async () => {
      const instructorToken = generateInstructorToken();
      const incompleteCourse = {
        name: "Advanced Programming",
      };

      const response = await request(app)
        .post(PATH)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send(incompleteCourse)
        .expect(400);

      expect(response.body.status).toBe("fail");
      expect(response.body.error).toBe("All fields are required");
    });

    test("should fail to create course with invalid instructor", async () => {
      const instructorToken = generateInstructorToken();
      const response = await request(app)
        .post(PATH)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send({
          ...testCourse,
          instructorID: "INVALID_ID",
        })
        .expect(400);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Instructor does not exist");
    });
  });

  describe("GET /api/courses", () => {
    beforeEach(async () => {
      // Create a test course for get operations
      await request(app)
        .post(PATH)
        .send({
          ...testCourse,
          instructorID: instructorId,
        });
    });

    test("should retrieve all courses successfully", async () => {
      const mockCourses = [
        {
          name: "Advanced Programming",
          code: "CS501",
          description: "Advanced programming concepts and practices",
          credits: 3,
          duration: 4,
          instructorID: new mongoose.Types.ObjectId(),
        },
        {
          name: "Database Management",
          code: "CS502",
          description: "Database design and management",
          credits: 3,
          duration: 4,
          instructorID: new mongoose.Types.ObjectId(),
        },
      ];
      await Course.create(mockCourses);
      const response = await request(app).get("/courses/").expect(200);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.data.courses)).toBeTruthy();
      expect(response.body.data.courses.length).toBeGreaterThan(0);
    });

    test("should return an empty array if no courses found", async () => {
      const response = await request(app).get("/courses/").expect(200);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.courses).toStrictEqual([]);
    });

    test("should retrieve specific course by code", async () => {
      await Course.create(testCourse);
      const response = await request(app).get(`/courses/${testCourse.code}`);

      // assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.course.code).toBe(testCourse.code);
    });

    test("should return error for non-existent course code", async () => {
      await Course.create(testCourse);
      const response = await request(app)
        .get("/courses/NONEXISTENT")
        .expect(400);

      expect(response.body.status).toBe("fail");
      expect(response.body.error).toBe("No course found");
      expect(response.body.courseCode).not.toBe(testCourse.code);
    });
  });

  describe("PUT /courses/:id", () => {
    let instructorToken;

    test("should update course successfully", async () => {
      instructorToken = generateInstructorToken();
      await Course.create(testCourse);

      const updatedCourse = {
        ...testCourse,
        name: "Updated Programming Course",
        instructorID: instructorId,
      };
      // console.log(updatedCourse);

      const response = await request(app)
        .put(`/courses/update/${testCourse.code}`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send(updatedCourse)
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data.course.name).toBe(updatedCourse.name);
    });

    test("should fail to update with missing required fields", async () => {
      instructorToken = generateInstructorToken();

      const incompleteCourse = {
        name: "Updated Programming Course",
      };

      await request(app)
        .put(`/courses/update/${testCourse.code}`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .send(incompleteCourse)
        .expect(400); // Your error middleware should catch the thrown error
    });
  });

  describe("DELETE /courses/delete/:id", () => {
    let instructorToken;
    test("should delete course successfully", async () => {
      instructorToken = generateInstructorToken();

      await Course.create(testCourse);
      const response = await request(app)
        .delete(`/courses/delete/${testCourse.code}`)
        .set("Authorization", `Bearer ${instructorToken}`)
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Course deleted successfully");
    });

    test("should return error when deleting non-existent course", async () => {
      instructorToken = generateInstructorToken();

      const response = await request(app)
        .delete("/courses/delete/NONEXISTENT")
        .set("Authorization", `Bearer ${instructorToken}`)
        .expect(400);

      expect(response.body.status).toBe("fail");
      expect(response.body.error).toBe("No course found");
    });
  });
});
