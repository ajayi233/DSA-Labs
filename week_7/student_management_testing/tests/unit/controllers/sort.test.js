const Student = require("../../../model/student");
const Course = require("../../../model/course");
const { quickSort } = require("../../../sortingAlg/sortStudent");
const { quickSortCourse } = require("../../../sortingAlg/sortCourse");
const { sortStudents, sortCourses } = require("../../../controllers/sort");

// Mock the models and sorting algorithms
jest.mock("../../../model/student");
jest.mock("../../../model/course");
jest.mock("../../../sortingAlg/sortStudent");
jest.mock("../../../sortingAlg/sortCourse");


describe('Sort Controllers', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = { query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("sortStudents", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {
        query: {}, // Default query params
      };
      mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.clearAllMocks();
    });
  
    const mockStudents = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
    ];
  
    it("should sort students with default parameters", async () => {
      Student.find.mockResolvedValue(mockStudents); // Mock database query
      quickSort.mockReturnValue(mockStudents); // Mock sorting
  
      await sortStudents(mockReq, mockRes);
  
      expect(Student.find).toHaveBeenCalled(); // Ensure database is queried
      expect(quickSort).toHaveBeenCalledWith(mockStudents, "lastName", "asc"); // Ensure sorting with default params
      expect(mockRes.json).toHaveBeenCalledWith(mockStudents); // Ensure response is sent
    });
  
    it("should sort students with custom parameters", async () => {
      mockReq.query = { sortBy: "firstName", order: "desc" };
      Student.find.mockResolvedValue(mockStudents); // Mock database query
      quickSort.mockReturnValue(mockStudents); // Mock sorting
  
      await sortStudents(mockReq, mockRes);
  
      expect(quickSort).toHaveBeenCalledWith(mockStudents, "firstName", "desc"); // Ensure sorting with custom params
      expect(mockRes.json).toHaveBeenCalledWith(mockStudents); // Ensure response is sent
    });
  
    it("should handle empty student list", async () => {
      Student.find.mockResolvedValue([]); // Mock empty result from database
      quickSort.mockReturnValue([]); // Mock sorting of empty list
  
      await sortStudents(mockReq, mockRes);
  
      expect(mockRes.json).toHaveBeenCalledWith([]); // Ensure response is empty list
    });
  
    it("should handle database error", async () => {
      Student.find.mockRejectedValue(new Error("Database error")); // Mock database error
  
      await sortStudents(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500); // Ensure error status is sent
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students.",
      }); // Ensure error response is sent
    });
  
    it("should handle sorting error", async () => {
      Student.find.mockResolvedValue(mockStudents); // Mock database query
      quickSort.mockImplementation(() => {
        throw new Error("Sorting error");
      }); // Mock sorting error
  
      await sortStudents(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500); // Ensure error status is sent
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students.",
      }); // Ensure error response is sent
    });
  });

  describe('sortCourses', () => {
    const mockCourses = [
      { code: 'CS101', name: 'Intro to CS' },
      { code: 'CS102', name: 'Data Structures' }
    ];

    it('should sort courses with default parameters', async () => {
      Course.find.mockResolvedValue(mockCourses);
      quickSortCourse.mockReturnValue(mockCourses);

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'code', 'asc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
    });

    it('should sort courses with custom parameters', async () => {
      mockReq.query = { sortBy: 'name', order: 'desc' };
      Course.find.mockResolvedValue(mockCourses);
      quickSortCourse.mockReturnValue(mockCourses);

      await sortCourses(mockReq, mockRes);

      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'name', 'desc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
    });

    it('should handle empty course list', async () => {
      Course.find.mockResolvedValue([]);
      quickSortCourse.mockReturnValue([]);

      await sortCourses(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    it('should handle database error', async () => {
      Course.find.mockRejectedValue(new Error('Database error'));

      await sortCourses(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Something went wrong while sorting courses.'
      });
    });

    it('should handle sorting error', async () => {
      Course.find.mockResolvedValue(mockCourses);
      quickSortCourse.mockImplementation(() => {
        throw new Error('Sorting error');
      });

      await sortCourses(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Something went wrong while sorting courses.'
      });
    });

    it('should handle undefined query parameters', async () => {
      mockReq.query = { sortBy: undefined, order: undefined };
      Course.find.mockResolvedValue(mockCourses);
      quickSortCourse.mockReturnValue(mockCourses);

      await sortCourses(mockReq, mockRes);

      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'code', 'asc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
    });
  });
});