const Student = require("../../../model/student");
const Instructor = require("../../../model/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authController = require("../../../controllers/auth");

jest.mock("../../../model/student");
jest.mock("../../../model/instructor");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

const mockRequest = (body = {}, user = {}) => ({ body, user });

describe("Auth Controller", () => {
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe("Auth Controller Tests (Jest Only)", () => {
    describe("studentLogin", () => {
      it("should return 400 if email or password is missing", async () => {
        const req = { body: { email: "", password: "" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.studentLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Missing email or password",
        });
      });

      it("should return 400 if the student does not exist", async () => {
        Student.findOne.mockResolvedValue(null);
        const req = { body: { email: "test@test.com", password: "password" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.studentLogin(req, res);

        expect(Student.findOne).toHaveBeenCalledWith({
          email: "test@test.com",
        });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Email does not exist",
        });
      });

      it("should return 400 if the password is incorrect", async () => {
        const mockStudent = { password: "hashedPassword" };
        Student.findOne.mockResolvedValue(mockStudent);
        bcrypt.compare.mockResolvedValue(false);

        const req = {
          body: { email: "test@test.com", password: "wrongpassword" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.studentLogin(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(
          "wrongpassword",
          "hashedPassword"
        );
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Email and password does not match",
        });
      });

      it("should return 200 and an access token on successful login", async () => {
        const mockStudent = {
          _id: "1",
          studentID: "123",
          role: "student",
          password: "hashedPassword",
        };
        Student.findOne.mockResolvedValue(mockStudent);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("mockedToken");

        const req = { body: { email: "test@test.com", password: "password" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.studentLogin(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
          { id: "1", studentID: "123", role: "student" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: "success",
          data: { accessToken: "mockedToken" },
          message: "Login successful...",
        });
      });
    });

    describe("instructorLogin", () => {
      it("should return 400 if email or password is missing", async () => {
        const req = { body: { email: "", password: "" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.instructorLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Missing email or password",
        });
      });

      it("should return 400 if the instructor does not exist", async () => {
        Instructor.findOne.mockResolvedValue(null);
        const req = { body: { email: "test@test.com", password: "password" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.instructorLogin(req, res);

        expect(Instructor.findOne).toHaveBeenCalledWith({
          email: "test@test.com",
        });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Email does not exist...",
        });
      });

      it("should return 400 if the password is incorrect", async () => {
        const mockInstructor = { password: "hashedPassword" };
        Instructor.findOne.mockResolvedValue(mockInstructor);
        bcrypt.compare.mockResolvedValue(false);

        const req = {
          body: { email: "test@test.com", password: "wrongpassword" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.instructorLogin(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(
          "wrongpassword",
          "hashedPassword"
        );
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Email and password does not match...",
        });
      });

      it("should return 200 and an access token on successful login", async () => {
        const mockInstructor = {
          _id: "1",
          InstructorID: "123",
          password: "hashedPassword",
        };
        Instructor.findOne.mockResolvedValue(mockInstructor);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("mockedToken");

        const req = { body: { email: "test@test.com", password: "password" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.instructorLogin(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
          { id: "1", InstructorID: "123" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: "success",
          data: { accessToken: "mockedToken" },
          message: "Login successful...",
        });
      });
    });

    describe("resetPassword", () => {
      it("should return 400 if passwords do not match or are missing", async () => {
        const req = { body: { password: "123", newPassword: "456" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "All fields are required and password must match",
        });
      });

      it("should return 400 if user is not found", async () => {
        const req = { body: { password: "123", newPassword: "123" }, user: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          status: "fail",
          message: "User not found",
        });
      });

      it("should reset password and return 200 on success", async () => {
        const req = {
          body: { password: "123", newPassword: "123" },
          user: { id: "1" },
        };
        Student.findByIdAndUpdate.mockResolvedValue({});
        Instructor.findByIdAndUpdate.mockResolvedValue({});
        bcrypt.hash.mockResolvedValue("hashedPassword");
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await authController.resetPassword(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith(
          "123",
          Number(process.env.SALT)
        );
        expect(Student.findByIdAndUpdate).toHaveBeenCalledWith("1", {
          password: "hashedPassword",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: "success",
          message: "Password reset successfully",
        });
      });
    });
  });
});

