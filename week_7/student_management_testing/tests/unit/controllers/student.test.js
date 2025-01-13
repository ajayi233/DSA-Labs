const Student = require("../../../model/student");
const studentController = require("../../../controllers/student");

jest.mock("../../../model/student");

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

const mockRequest = (params = {}, body = {}, query = {}, user = {}) => ({
  params,
  body,
  query,
  user
});

describe("Student Controller", () => {
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe("getAllStudents", () => {
    it("should get all students successfully", async () => {
      const mockStudents = [
        { id: 1, name: "Test Student 1" },
        { id: 2, name: "Test Student 2" }
      ];

      Student.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockStudents)
      });
      
      Student.countDocuments.mockResolvedValue(2);

      const req = mockRequest({}, {}, { page: 1 });
      await studentController.getAllStudents(req, res);

      expect(Student.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        totalResult: 2,
        data: mockStudents,
        message: "Students found successfully"
      });
    });

    it("should handle no students found", async () => {
      Student.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(null)
      });

      const req = mockRequest();
      await studentController.getAllStudents(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "No student found"
      });
    });
  });

  describe("registerStudent", () => {
    it("should register a new student successfully", async () => {
      const mockStudent = {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        email: "john@example.com",
        password: "password123",
        phone: "1234567890",
        address: "Test Address",
        gender: "Male",
        enrollmentDate: "2024-01-01"
      };

      Student.findOne.mockResolvedValue(null);
      Student.create.mockResolvedValue(mockStudent);

      const req = mockRequest({}, mockStudent);
      await studentController.registerStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockStudent,
        message: "Student registered successfully"
      });
    });

    it("should handle missing required fields", async () => {
      const req = mockRequest({}, { firstName: "John" });
      await studentController.registerStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Please fill all the fields"
      });
    });

    it("should handle duplicate email", async () => {
      const mockStudent = {
        firstName: "John",
        lastName: "Doe",
        email: "existing@example.com",
        password: "password123",
        phone: "1234567890",
        address: "Test Address",
        gender: "Male",
        dateOfBirth: "1990-01-01",
        enrollmentDate: "2024-01-01"
      };

      Student.findOne.mockResolvedValue({ email: mockStudent.email });

      const req = mockRequest({}, mockStudent);
      await studentController.registerStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Email already exists"
      });
    });
  });
});