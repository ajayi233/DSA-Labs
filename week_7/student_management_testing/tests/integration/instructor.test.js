const app = require("../../index");
const request = require("supertest");
const Instructor = require("../../model/instructor");

describe("Instructor controller", () => {
  const savedInstructor = {
    firstName: "John",
    lastName: "Doe",
    email: "newe2Bhjnewekmeee4jhgj@efxample.com",
    password: "password123",
    dateOfBirth: "1990-01-01",
    phone: "123-456-7890",
    address: "123 Main St",
    hireDate: "2022-01-01",
    department: "Computer Science",
    InstructorID: "tes",
  };

  const unsavedInstructor = {
    firstName: "John",
    lastName: "Doe",
    email: "eunsavedjh2Bnewekmeee4jhgj@efxample.com",
    password: "password123",
    dateOfBirth: "1990-01-01",
    phone: "123-456-7890",
    address: "123 Main St",
    hireDate: "2022-01-01",
    department: "Computer Science",
  };

  beforeAll(async () => {
    await Instructor.deleteMany({});
    await new Instructor(savedInstructor).save();
  });
  afterAll(async () => {
    await Instructor.deleteMany({});
  });

  it("shuld return status 400 becuase not all fields are given", async () => {
    const response = await request(app)
      .post("/instructors/add")
      .send({ lastName: "test" });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 400  because the email is already registered", async () => {
    const response = await request(app)
      .post("/instructors/add")
      .send(savedInstructor);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should register an instructor", async () => {
    const response = await request(app)
      .post("/instructors/add")
      .send(unsavedInstructor);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe("Instructor created successfully");
  });
});
