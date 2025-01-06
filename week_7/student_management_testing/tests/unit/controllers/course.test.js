const {
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../../../controllers/course");

jest.mock("../../../model/course");
jest.mock("../../../model/instructor");

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
  });

  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
  });

  describe("getCourseById", () => {
    it("should return course data when course is found", async () => {
      const req = mockRequest({ id: "1" });
      const courseData = { id: "1", name: "Test Course" };
      require("../../../model/course").findOne.mockResolvedValue(courseData);

      await getCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { course: courseData },
        message: "Course found successfully",
      });
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "1" });
      require("../../../model/course").findOne.mockResolvedValue(null);

      await getCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No course found",
      });
    });
  });

  describe("updateCourseById", () => {
    it("should update course data when course is found", async () => {
      const req = mockRequest({ id: "1" }, { name: "Updated Course" });
      const updatedCourseData = { id: "1", name: "Updated Course" };
      require("../../../model/course").findOneAndUpdate.mockResolvedValue(
        updatedCourseData
      );

      await updateCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { course: updatedCourseData },
        message: "Course updated successfully",
      });
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "1" }, { name: "Updated Course" });
      require("../../../model/course").findOneAndUpdate.mockResolvedValue(null);

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
      const req = mockRequest({ id: "1" });
      require("../../../model/course").findOneAndDelete.mockResolvedValue({
        id: "1",
      });

      await deleteCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Course deleted successfully",
      });
    });

    it("should return 400 when course is not found", async () => {
      const req = mockRequest({ id: "1" });
      require("../../../model/course").findOneAndDelete.mockResolvedValue(null);

      await deleteCourseById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "fail",
        error: "No course found",
      });
    });
  });
});


