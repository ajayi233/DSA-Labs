const bcrypt = require('bcryptjs');
const Instructor = require('../../../model/instructor');
const {
  addInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById
} = require('../../../controllers/instructor');

// Mock the entire instructor model and bcrypt
jest.mock('../../../model/instructor');
jest.mock('bcryptjs');
  

describe('Instructor Controllers', () => {
  let mockReq;
  let mockRes;
  
  // Sample instructor data for testing
  const sampleInstructor = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    password: 'password123',
    dateOfBirth: '1980-01-01',
    phone: '1234567890',
    address: '123 Test St',
    hireDate: '2023-01-01',
    department: 'Computer Science',
    InstructorID: 'INSTR1234567'
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Set environment variable for tests
    process.env.SALT = '10';
  });

  describe('addInstructor', () => {
    beforeEach(() => {
      mockReq = {
        body: { ...sampleInstructor }
      };
    });

    test('should create a new instructor successfully', async () => {
      // Mock implementations
      Instructor.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      Instructor.create.mockResolvedValue(sampleInstructor);

      await addInstructor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: { instructor: sampleInstructor },
        message: 'Instructor created successfully'
      });
    });

    test('should return 400 if required fields are missing', async () => {
      mockReq.body = { firstName: 'John' }; // Missing required fields

      await addInstructor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Please fill all the fields'
      });
    });

    test('should return 400 if email already exists', async () => {
      Instructor.findOne.mockResolvedValue(sampleInstructor);

      await addInstructor(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Email already exists'
      });
    });
  });

  describe('getAllInstructors', () => {
    beforeEach(() => {
      mockReq = { query: {} };
    });

    test('should return all instructors successfully', async () => {
      const mockInstructors = [sampleInstructor, {...sampleInstructor, email: 'another@test.com'}];
      Instructor.find.mockResolvedValue(mockInstructors);

      await getAllInstructors(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: { instructors: mockInstructors },
        message: 'Instructors found successfully'
      });
    });

    test('should return 400 if no instructors found', async () => {
      Instructor.find.mockResolvedValue(null);

      await getAllInstructors(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'No instructors found'
      });
    });
  });

  describe('getInstructorById', () => {
    beforeEach(() => {
      mockReq = {
        params: { id: 'INSTR1234567' }
      };
    });

    test('should return instructor by ID successfully', async () => {
      Instructor.findOne.mockResolvedValue(sampleInstructor);

      await getInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: { instructor: sampleInstructor },
        message: 'Instructor found successfully'
      });
    });

    test('should return 400 if instructor not found', async () => {
      Instructor.findOne.mockResolvedValue(null);

      await getInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'No instructor found'
      });
    });
  });

  describe('updateInstructorById', () => {
    beforeEach(() => {
      mockReq = {
        params: { id: 'INSTR1234567' },
        body: { ...sampleInstructor }
      };
    });

    test('should update instructor successfully', async () => {
      bcrypt.hash.mockResolvedValue('newHashedPassword');
      Instructor.findOneAndUpdate.mockResolvedValue(sampleInstructor);

      await updateInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: { instructor: sampleInstructor },
        message: 'Instructor updated successfully'
      });
    });

    test('should return 400 if required fields are missing', async () => {
      mockReq.body = { firstName: 'John' }; // Missing required fields

      await updateInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Please fill all the fields'
      });
    });

    test('should return 400 if instructor not found', async () => {
      bcrypt.hash.mockResolvedValue('hashedPassword');
      Instructor.findOneAndUpdate.mockResolvedValue(null);

      await updateInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'No instructor found'
      });
    });
  });

  describe('deleteInstructorById', () => {
    beforeEach(() => {
      mockReq = {
        params: { id: 'INSTR1234567' }
      };
    });

    test('should delete instructor successfully', async () => {
      Instructor.findOneAndDelete.mockResolvedValue(sampleInstructor);

      await deleteInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: { instructor: sampleInstructor },
        message: 'Instructor deleted successfully'
      });
    });

    test('should return 400 if instructor not found', async () => {
      Instructor.findOneAndDelete.mockResolvedValue(null);

      await deleteInstructorById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'No instructor found'
      });
    });
  });
});