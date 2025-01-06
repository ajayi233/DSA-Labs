const Student = require("../../../model/student");
const Course = require("../../../model/course");
const quickSort = require("../../../sortingAlg/sortStudent");
const { quickSortCourse } = require("../../../sortingAlg/sortCourse");
const { sortStudents, sortCourses } = require("../../../controllers/sort");

// Mock the models and sorting algorithms
jest.mock("../../../model/student");
jest.mock("../../../model/course");
jest.mock("../../../sortingAlg/sortStudent");
jest.mock("../../../sortingAlg/sortCourse");

describe("Sort Controllers", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("sortStudents", () => {
    const mockStudents = [
      { lastName: "Smith", firstName: "John" },
      { lastName: "Doe", firstName: "Jane" },
    ];

    beforeEach(() => {
      mockReq = {
        query: {}
      };
      // Default mock implementation for Student.find()
      Student.find.mockResolvedValue(mockStudents);
      // Default mock implementation for quickSort
      quickSort.mockImplementation((students) => students);
    });

    it("should sort students with default parameters", async () => {
      const sortedStudents = [...mockStudents];
      quickSort.mockReturnValue(sortedStudents);

      await sortStudents(mockReq, mockRes);

      expect(Student.find).toHaveBeenCalled();
      expect(quickSort).toHaveBeenCalledWith(mockStudents, "lastName", "asc");
      expect(mockRes.json).toHaveBeenCalledWith(sortedStudents);
    });

    it("should sort students with custom parameters", async () => {
      mockReq.query = { sortBy: "firstName", order: "desc" };
      const sortedStudents = [...mockStudents].reverse();
      quickSort.mockReturnValue(sortedStudents);

      await sortStudents(mockReq, mockRes);

      expect(Student.find).toHaveBeenCalled();
      expect(quickSort).toHaveBeenCalledWith(mockStudents, "firstName", "desc");
      expect(mockRes.json).toHaveBeenCalledWith(sortedStudents);
    });

    it("should handle database errors properly", async () => {
      const error = new Error("Database error");
      Student.find.mockRejectedValue(error);

      await sortStudents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students."
      });
    });

    it("should handle sorting algorithm errors", async () => {
      quickSort.mockImplementation(() => {
        throw new Error("Sorting error");
      });

      await sortStudents(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students."
      });
    });
  });

  describe("sortCourses", () => {
    const mockCourses = [
      { code: "CS101", name: "Introduction to Programming" },
      { code: "CS102", name: "Data Structures" },
    ];

    beforeEach(() => {
      mockReq = {
        query: {}
      };
      // Default mock implementation for Course.find()
      Course.find.mockResolvedValue(mockCourses);
      // Default mock implementation for quickSortCourse
      quickSortCourse.mockImplementation((courses) => courses);
    });

    it("should sort courses with default parameters", async () => {
      const sortedCourses = [...mockCourses];
      quickSortCourse.mockReturnValue(sortedCourses);

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, "code", "asc");
      expect(mockRes.json).toHaveBeenCalledWith(sortedCourses);
    });

    it("should sort courses with custom parameters", async () => {
      mockReq.query = { sortBy: "name", order: "desc" };
      const sortedCourses = [...mockCourses].reverse();
      quickSortCourse.mockReturnValue(sortedCourses);

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, "name", "desc");
      expect(mockRes.json).toHaveBeenCalledWith(sortedCourses);
    });

    it("should handle database errors properly", async () => {
      const error = new Error("Database error");
      Course.find.mockRejectedValue(error);

      await sortCourses(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting courses."
      });
    });

    it("should handle sorting algorithm errors", async () => {
      quickSortCourse.mockImplementation(() => {
        throw new Error("Sorting error");
      });

      await sortCourses(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting courses."
      });
    });
  });
});