const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../../model/student');
const Instructor = require('../../model/instructor');
const { studentLogin, instructorLogin, resetPassword } = require('../../controllers/auth');

// Mock all dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../model/student');
jest.mock('../../model/instructor');

describe('Auth Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock response object with status and json methods
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Set environment variables needed for tests
    process.env.JWT_SECRET = 'test-secret';
    process.env.SALT = '10';
  });

  describe('studentLogin', () => {
    beforeEach(() => {
      mockReq = {
        body: {
          email: 'test@student.com',
          password: 'password123'
        }
      };
    });

    it('should return 400 when email is missing', async () => {
      mockReq.body = { password: 'password123' };
      
      await studentLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Missing email or password'
      });
    });

    it('should return 400 when password is missing', async () => {
      mockReq.body = { email: 'test@student.com' };
      
      await studentLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Missing email or password'
      });
    });

    it('should return 400 when student email does not exist', async () => {
      Student.findOne.mockResolvedValue(null);
      
      await studentLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Email does not exist'
      });
    });

    it('should return 400 when password is incorrect', async () => {
      Student.findOne.mockResolvedValue({
        email: 'test@student.com',
        password: 'hashedPassword'
      });
      bcrypt.compare.mockResolvedValue(false);
      
      await studentLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Email and password does not match'
      });
    });

    it('should login successfully and return token', async () => {
      const mockStudent = {
        _id: 'student123',
        studentID: 'STD123',
        role: 'student',
        password: 'hashedPassword'
      };
      
      Student.findOne.mockResolvedValue(mockStudent);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockResolvedValue('test-token');
      
      await studentLogin(mockReq, mockRes);
      
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockStudent._id,
          studentID: mockStudent.studentID,
          role: mockStudent.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: { accessToken: 'test-token' },
        message: 'Login successful...'
      });
    });
  });

  describe('instructorLogin', () => {
    beforeEach(() => {
      mockReq = {
        body: {
          email: 'test@instructor.com',
          password: 'password123'
        }
      };
    });

    it('should return 400 when email is missing', async () => {
      mockReq.body = { password: 'password123' };
      
      await instructorLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Missing email or password'
      });
    });

    it('should return 400 when password is missing', async () => {
      mockReq.body = { email: 'test@instructor.com' };
      
      await instructorLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Missing email or password'
      });
    });

    it('should return 400 when instructor email does not exist', async () => {
      Instructor.findOne.mockResolvedValue(null);
      
      await instructorLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Email does not exist'
      });
    });

    it('should return 400 when password is incorrect', async () => {
      Instructor.findOne.mockResolvedValue({
        email: 'test@instructor.com',
        password: 'hashedPassword'
      });
      bcrypt.compare.mockResolvedValue(false);
      
      await instructorLogin(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Email and password does not match'
      });
    });

    it('should login successfully and return token', async () => {
      const mockInstructor = {
        _id: 'instructor123',
        InstructorID: 'INS123',
        password: 'hashedPassword'
      };
      
      Instructor.findOne.mockResolvedValue(mockInstructor);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockResolvedValue('test-token');
      
      await instructorLogin(mockReq, mockRes);
      
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockInstructor._id,
          InstructorID: mockInstructor.InstructorID
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        data: { accessToken: 'test-token' },
        message: 'Login successful...'
      });
    });
  });

  describe('resetPassword', () => {
    beforeEach(() => {
      mockReq = {
        body: {
          password: 'newPassword123',
          newPassword: 'newPassword123'
        },
        user: {
          id: 'user123'
        }
      };
    });

    it('should return 400 when passwords do not match', async () => {
      mockReq.body = {
        password: 'password1',
        newPassword: 'password2'
      };
      
      await resetPassword(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'All fields are required and password must match'
      });
    });

    it('should return 400 when user is not found', async () => {
      mockReq.user = {};
      
      await resetPassword(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'User not found'
      });
    });

    it('should successfully reset password', async () => {
      const hashedPassword = 'hashedNewPassword';
      bcrypt.hash.mockResolvedValue(hashedPassword);
      Student.findByIdAndUpdate.mockResolvedValue({});
      Instructor.findByIdAndUpdate.mockResolvedValue({});
      
      await resetPassword(mockReq, mockRes);
      
      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
      expect(Student.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
        password: hashedPassword
      });
      expect(Instructor.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
        password: hashedPassword
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Password reset successfully'
      });
    });
  });
});