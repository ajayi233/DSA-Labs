const {
  registerStudent,
  getAllStudents,
  getStudentById,
  studentSelfUpdate,
  updateStudentById,
  deleteStudentById,
} = require("../../controllers/student");
const supertest = require("supertest");
const request = supertest("http://localhost:3000");

const student = {
  firstName: "charlotte",
  lastName: "martinez",
  dateOfBirth: "03/22/1994",
  email: "charlottem@example.com",
  password: "qwerty",
  phone: "3334445555",
  address: "321 Cherry St",
  gender: "female",
  enrollmentDate: "2016/05/01",
};

describe("Register student", () => {
  it("should send a status of 400 when fields are missing", async () => {});

  it("should send a status of 200 when student is registered", async () => {});
});

describe("Get all students", () => {
  it("should send a status of 400 when no students are found", async () => {});

  it("should send a status of 200 when student is found", async () => {});
});

describe("Get student by id", () => {
  it("should send a status of 400 when student is not found", async () => {});

  it("should send a status of 200 when student is found", async () => {});
});

describe("Student self update", () => {
  it("should send a status of 400 when fields are missing", async () => {});

  it("should send a status of 200 when student is updated", async () => {});
});

describe("Update student by id", () => {
  it("should send a status of 400 when student is not found", async () => {});

  it("should send a status of 200 when student is updated", async () => {});
});

describe("Delete student by id", () => {
  it("should send a status of 400 when student is not found", async () => {});

  it("should send a status of 200 when student is deleted", async () => {});
});
