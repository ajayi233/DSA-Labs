const {
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../../../controllers/course");
const Course = require("../../../model/course");
const Instructor = require("../../../model/instructor");

jest.mock("../../../model/course");
jest.mock("../../../model/instructor");
jest.mock("../../../utils/logger");

describe("Course Controller", () => {
  let res;

  const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  const mockRequest = (params = {}, body = {}, query = {}, user = {}) => ({
    params,
    body,
    query,
    user,
    url: '/test',
    method: 'GET'
  });

  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe("getCourseById", () => {
    it("should return course data when course is found", async () => {
      const courseData = { 
        code: "TEST101", 
        name: "Test Course",
        description: "Test Description",
        credits: 3,
        instructorID: "INST123",
        duration: "3 months"
      };
      const req = mockRequest({ id: "TEST101" });
      Course.findOne.mockResolvedValue(courseData);

      await getCourseById(req, res);

      expect(Course.findOne).toHaveBeenCalledWith({ code: "TEST101" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { course: courseData },
        message: "Course found successfully",
      });
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "TEST101" });
      Course.findOne.mockResolvedValue(null);

      await getCourseById(req, res);

      expect(Course.findOne).toHaveBeenCalledWith({ code: "TEST101" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No course found",
      });
    });
  });

  describe("updateCourseById", () => {
    const validUpdateBody = {
      name: "Updated Course",
      code: "TEST101",
      description: "Updated Description",
      credits: 4,
      instructorID: "INST123",
      duration: "4 months"
    };

    it("should update course data when course is found", async () => {
      const req = mockRequest({ id: "TEST101" }, validUpdateBody);
      const updatedCourseData = { ...validUpdateBody };
      
      Instructor.findOne.mockResolvedValue({ _id: "instructor_id_123" });
      Course.findOneAndUpdate.mockResolvedValue(updatedCourseData);

      await updateCourseById(req, res);

      expect(Instructor.findOne).toHaveBeenCalledWith({ 
        instructorID: validUpdateBody.instructorID 
      });
      expect(Course.findOneAndUpdate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { course: updatedCourseData },
        message: "Course updated successfully",
      });
    });

    it("should throw error when required fields are missing", async () => {
      const req = mockRequest({ id: "TEST101" }, { 
        name: "Updated Course" 
      });

      await expect(updateCourseById(req, res)).rejects.toEqual(
        "Course code is required..."
      );
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "TEST101" }, validUpdateBody);
      
      Instructor.findOne.mockResolvedValue({ _id: "instructor_id_123" });
      Course.findOneAndUpdate.mockResolvedValue(null);

      await updateCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No course found",
      });
    });
  });

  describe("deleteCourseById", () => {
    it("should delete course when course is found", async () => {
      const req = mockRequest({ id: "TEST101" });
      const deletedCourse = {
        code: "TEST101",
        name: "Test Course"
      };
      Course.findOneAndDelete.mockResolvedValue(deletedCourse);

      await deleteCourseById(req, res);

      expect(Course.findOneAndDelete).toHaveBeenCalledWith({ code: "TEST101" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { course: deletedCourse },
        message: "Course deleted successfully",
      });
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "TEST101" });
      Course.findOneAndDelete.mockResolvedValue(null);

      await deleteCourseById(req, res);

      expect(Course.findOneAndDelete).toHaveBeenCalledWith({ code: "TEST101" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No course found",
      });
    });
  });
});