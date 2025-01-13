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
  // describe("sortStudents", () => {
  //   let mockReq;
  //   let mockRes;
  //   const mockStudents = [
  //     { firstName: "John", lastName: "Doe" },
  //     { firstName: "Jane", lastName: "Smith" },
  //   ];
  
  //   beforeEach(() => {
  //     mockReq = {
  //       query: {}, // Default query params
  //     };
  //     mockRes = {
  //       json: jest.fn(),
  //       status: jest.fn().mockReturnThis(),
  //     };
  
  //     // Reset all mocks before each test
  //     jest.clearAllMocks();
      
  //     // Setup default mock implementations
  //     Student.find.mockResolvedValue(mockStudents);
  //     quickSort.mockImplementation((students, sortBy, order) => {
  //       // Return a new array to simulate sorting
  //       return [...students];
  //     });
  //   });
  
  //   it("should sort students with default parameters", async () => {
  //     // Setup the quickSort mock with specific return value
  //     const sortedStudents = [...mockStudents];
  //     quickSort.mockReturnValue(sortedStudents);

  //     await sortStudents(mockReq, mockRes);

  //     expect(Student.find).toHaveBeenCalled();
  //     expect(quickSort).toHaveBeenCalledWith(mockStudents, "lastName", "asc");
  //     expect(mockRes.json).toHaveBeenCalledWith(sortedStudents);
  //     expect(mockRes.status).not.toHaveBeenCalled();
  //   });

  //   it("should sort students with custom parameters", async () => {
  //     mockReq.query = { sortBy: "firstName", order: "desc" };
      
  //     await sortStudents(mockReq, mockRes);
  
  //     expect(Student.find).toHaveBeenCalled();
  //     expect(quickSort).toHaveBeenCalledWith(mockStudents, "firstName", "desc");
  //     expect(mockRes.json).toHaveBeenCalledWith(mockStudents);
  //     expect(mockRes.status).not.toHaveBeenCalled();
  //   });
  
  //   it("should handle empty student list", async () => {
  //     const emptyList = [];
  //     Student.find.mockResolvedValue(emptyList);
  //     quickSort.mockReturnValue(emptyList);
  
  //     await sortStudents(mockReq, mockRes);
  
  //     expect(Student.find).toHaveBeenCalled();
  //     expect(quickSort).toHaveBeenCalledWith(emptyList, "lastName", "asc");
  //     expect(mockRes.json).toHaveBeenCalledWith(emptyList);
  //     expect(mockRes.status).not.toHaveBeenCalled();
  //   });
  // });

    it("should handle database error", async () => {
      Student.find.mockRejectedValue(new Error("Database error"));
  
      await sortStudents(mockReq, mockRes);
  
      expect(Student.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students.",
      });
    });
  
    it("should handle sorting error", async () => {
      Student.find.mockResolvedValue(mockStudents);
      quickSort.mockImplementation(() => {
        throw new Error("Sorting error");
      });
  
      await sortStudents(mockReq, mockRes);
  
      expect(Student.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Something went wrong while sorting students.",
      });
    });
  });

  describe('sortCourses', () => {
    let mockReq;
    let mockRes;
    const mockCourses = [
      { code: 'CS101', name: 'Intro to CS' },
      { code: 'CS102', name: 'Data Structures' }
    ];

    beforeEach(() => {
      mockReq = {
        query: {},
      };
      mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Reset all mocks before each test
      jest.clearAllMocks();
      
      // Setup default mock implementations
      Course.find.mockResolvedValue(mockCourses);
      quickSortCourse.mockImplementation((courses, sortBy, order) => {
        // Return a new array to simulate sorting
        return [...courses];
      });
    });

    it('should sort courses with default parameters', async () => {
      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'code', 'asc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should sort courses with custom parameters', async () => {
      mockReq.query = { sortBy: 'name', order: 'desc' };
      
      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'name', 'desc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should handle empty course list', async () => {
      const emptyList = [];
      Course.find.mockResolvedValue(emptyList);
      quickSortCourse.mockReturnValue(emptyList);

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(emptyList, 'code', 'asc');
      expect(mockRes.json).toHaveBeenCalledWith(emptyList);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should handle database error', async () => {
      Course.find.mockRejectedValue(new Error('Database error'));

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Something went wrong while sorting courses.'
      });
    });

    it('should handle sorting error', async () => {
      quickSortCourse.mockImplementation(() => {
        throw new Error('Sorting error');
      });

      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Something went wrong while sorting courses.'
      });
    });

    it('should handle undefined query parameters', async () => {
      mockReq.query = { sortBy: undefined, order: undefined };
      
      await sortCourses(mockReq, mockRes);

      expect(Course.find).toHaveBeenCalled();
      expect(quickSortCourse).toHaveBeenCalledWith(mockCourses, 'code', 'asc');
      expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });
