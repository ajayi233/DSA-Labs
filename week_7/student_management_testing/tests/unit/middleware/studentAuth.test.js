const jwt = require('jsonwebtoken');
const studentAuth = require('../../../middleware/studentAuth');


jest.mock('jsonwebtoken');

describe('Student Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {
        authorization: 'Bearer mock-token'
      },
      user: null
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
    process.env.JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate valid token and set user', () => {
    const mockUser = { id: '123', role: 'student' };
    jwt.verify.mockReturnValue(mockUser);

    studentAuth(mockReq, mockRes, nextFunction);

    expect(jwt.verify).toHaveBeenCalledWith('mock-token', 'test-secret');
    expect(mockReq.user).toBe(mockUser);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('should return 401 for invalid token', () => {
    jwt.verify.mockReturnValue(null);

    studentAuth(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Unauthorized, please login'
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should handle missing authorization header', () => {
    mockReq.headers.authorization = undefined;

    expect(() => {
      studentAuth(mockReq, mockRes, nextFunction);
    }).toThrow();

    expect(nextFunction).not.toHaveBeenCalled();
  });


  it('should handle jwt verification errors', () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Token expired');
    });

    expect(() => {
      studentAuth(mockReq, mockRes, nextFunction);
    }).toThrow('Token expired');

    expect(nextFunction).not.toHaveBeenCalled();
  });
});