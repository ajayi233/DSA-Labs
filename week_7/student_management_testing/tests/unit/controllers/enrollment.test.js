const Enrollment = require("../../../model/enrollment");
const Student = require("../../../model/student");
const Course = require("../../../model/course");
const enrollmentController = require("../../../controllers/enrollment");

jest.mock("../../../model/enrollment");
jest.mock("../../../model/student");
jest.mock("../../../model/course");

const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

const mockRequest = (body = {}, params = {}, user = {}) => ({
  body,
  params,
  user
});

describe("Enrollment Controller", () => {
  let res;
  
  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe("addEnrollment", () => {
    const mockStudent = {
      _id: "stud1",
      coursesEnrolled: [],
      save: jest.fn().mockResolvedValue(true)
    };
    const mockCourse = { _id: "course1" };

    it("should enroll student successfully", async () => {
      Student.findOne.mockResolvedValue(mockStudent);
      Course.findOne.mockResolvedValue(mockCourse);
      Enrollment.create.mockResolvedValue({ 
        _id: "enroll1", 
        student: "stud1", 
        course: "course1" 
      });

      await enrollmentController.addEnrollment(
        mockRequest({ studentID: "STD123", courseCode: "TC101" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Object),
        message: "Student enrolled successfully"
      });
    });

    it("should handle missing studentID or courseCode", async () => {
      await enrollmentController.addEnrollment(
        mockRequest({ studentID: "" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Student ID and course code are required"
      });
    });

    it("should handle invalid student or course", async () => {
      Student.findOne.mockResolvedValue(null);
      Course.findOne.mockResolvedValue(null);

      await enrollmentController.addEnrollment(
        mockRequest({ studentID: "INVALID", courseCode: "INVALID" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Error in getting student or course"
      });
    });
  });

  describe("selfEnroll", () => {
    const mockStudent = {
      _id: "stud1",
      id: "stud1",
      coursesEnrolled: [],
      save: jest.fn().mockResolvedValue(true)
    };
    const mockCourse = { _id: "course1", code: "TC101" };

    it("should self enroll successfully", async () => {
      Student.findOne.mockResolvedValue(mockStudent);
      Course.findOne.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue(null);
      Enrollment.create.mockResolvedValue({ _id: "enroll1" });

      await enrollmentController.selfEnroll(
        mockRequest({ courseCode: "TC101" }, {}, { studentID: "STD123" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Object),
        message: expect.any(String)
      });
    });

    it("should handle duplicate enrollment", async () => {
      Student.findOne.mockResolvedValue(mockStudent);
      Course.findOne.mockResolvedValue(mockCourse);
      Enrollment.findOne.mockResolvedValue({ _id: "existing" });

      await enrollmentController.selfEnroll(
        mockRequest({ courseCode: "TC101" }, {}, { studentID: "STD123" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "You have already been enrolled to this course"
      });
    });
  });

  describe("getAllEnrollments", () => {
    const mockStudent = {
      _id: "stud1",
      firstName: "John",
      lastName: "Doe"
    };

    it("should get all enrollments successfully", async () => {
      Student.findOne.mockResolvedValue(mockStudent);
      Enrollment.find.mockResolvedValue([{ course: "course1" }]);
      Course.find.mockResolvedValue([{ code: "TC101" }]);

      await enrollmentController.getAllEnrollments(
        mockRequest({}, { id: "STD123" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { courses: ["TC101"] },
        message: expect.any(String)
      });
    });

    it("should handle no enrollments found", async () => {
      Student.findOne.mockResolvedValue(mockStudent);
      Enrollment.find.mockResolvedValue(null);

      await enrollmentController.getAllEnrollments(
        mockRequest({}, { id: "STD123" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No enrollments found"
      });
    });
  });

  describe("getAllEnrolledStudents", () => {
    it("should get all enrolled students successfully", async () => {
      const mockStudents = [{ id: "stud1" }];
      Course.findOne.mockResolvedValue({ _id: "course1", code: "TC101" });
      Enrollment.find.mockResolvedValue([{ student: "stud1" }]);
      Student.find.mockResolvedValue(mockStudents);

      await enrollmentController.getAllEnrolledStudents(
        mockRequest({}, { id: "TC101" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { enrolledStudents: mockStudents },
        message: expect.any(String)
      });
    });
  });

  describe("deleteEnrollmentById", () => {
    const mockStudent = {
      _id: "stud1",
      coursesEnrolled: ["enroll1"],
      save: jest.fn().mockResolvedValue(true)
    };

    it("should delete enrollment successfully", async () => {
      const mockEnrollment = { _id: "enroll1", student: "stud1" };
      Enrollment.findByIdAndDelete.mockResolvedValue(mockEnrollment);
      Student.findOne.mockResolvedValue(mockStudent);

      await enrollmentController.deleteEnrollmentById(
        mockRequest({}, { id: "enroll1" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockEnrollment,
        message: "Enrollment deleted successfully"
      });
    });

    it("should handle enrollment not found", async () => {
      Enrollment.findByIdAndDelete.mockResolvedValue(null);

      await enrollmentController.deleteEnrollmentById(
        mockRequest({}, { id: "invalid" }), 
        res
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "No enrollment found"
      });
    });
  });
});