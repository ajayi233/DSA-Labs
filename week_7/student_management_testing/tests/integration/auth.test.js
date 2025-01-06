const app = require("../../index");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const Student = require("../../model/student");
const Instructor = require("../../model/instructor");

describe("Instructor login controller", () => {
  const url = "/auth/instructor/login";
  const savedInstructor = {
    firstName: "John",
    lastName: "Doe",
    email: "e2Bnekjhwekmeee4jhgj@efxample.com",
    password: bcrypt.hashSync("password123", Number(process.env.SALT)),
    dateOfBirth: "1990-01-01",
    phone: "123-456-7890",
    address: "123 Main St",
    hireDate: "2022-01-01",
    department: "Computer Science",
    InstructorID: "test12333",
  };

  beforeAll(async () => {
    await Instructor.deleteMany({});
    await new Instructor(savedInstructor).save();
  });
  afterAll(async () => {
    await Instructor.deleteMany({});
  });

  it("should return status 400 if email or password is not provided", async () => {
    const response = await request(app).post(url).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing email or password");
  });

  it("should return status 400 if email is not registered", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: "hjhh@gmail.com", password: "password123" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email does not exist");
  });

  it("should return status 400 if password is incorrect", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: savedInstructor.email, password: "wrong password" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email and password does not match");
  });

  it("should successfully log in an instructor", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: savedInstructor.email, password: "password123" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.message).toBe("Login successful");
  });    
});

describe("Student login controller", () => {
  const url = "/auth/student/login";
  const savedStudent = {
    firstName: "Jane",
    lastName: "Doe",
    email: "student@example.com",
    password: bcrypt.hashSync("password123", Number(process.env.SALT)),
    dateOfBirth: "2000-01-01",
    phone: "123-456-7890",
    address: "456 Elm St",
    gender: "female",
    enrollmentDate: "2022-09-01",
    studentID: "testStudent123",
  };

  beforeAll(async () => {
    await Student.deleteMany({});
    await new Student(savedStudent).save();
  });

  afterAll(async () => {
    await Student.deleteMany({});
  });

  it("should return status 400 if email or password is not provided", async () => {
    const response = await request(app).post(url).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing email or password");
  });

  it("should return status 400 if email is not registered", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: "nonexistent@example.com", password: "password123" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email does not exist");
  });

  it("should return status 400 if password is incorrect", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: savedStudent.email, password: "wrongpassword" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email and password does not match");
  });

  it("should successfully log in a student", async () => {
    const response = await request(app)
      .post(url)
      .send({ email: savedStudent.email, password: "password123" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.message).toBe("Login successful...");
  });
});


