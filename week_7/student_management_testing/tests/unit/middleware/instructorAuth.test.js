const jwt = require("jsonwebtoken");
const instructorAuth = require("../../../middleware/instructorAuth");

jest.mock("jsonwebtoken");

describe("Instructor Auth Middleware", () => {
  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: "Bearer validAccessToken",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next() if the user is an instructor", () => {
    // Mock jwt.verify to return a valid payload with role: "instructor"
    jwt.verify.mockReturnValue({ role: "instructor", id: "12345" });

    instructorAuth(mockRequest, mockResponse, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      "validAccessToken",
      process.env.JWT_SECRET
    );
    expect(mockRequest.user).toEqual({ role: "instructor", id: "12345" });
    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 401 if the user role is student", () => {
    // Mock jwt.verify to return a payload with role: "student"
    jwt.verify.mockReturnValue({ role: "student", id: "67890" });

    instructorAuth(mockRequest, mockResponse, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      "validAccessToken",
      process.env.JWT_SECRET
    );
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unauthorized user",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", () => {
    mockRequest.headers.authorization = "";

    instructorAuth(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unauthorized user",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 if jwt.verify throws an error", () => {
    // Mock jwt.verify to throw an error
    const error = new Error("Invalid token");
    jwt.verify.mockImplementation(() => {
      error;
    });

    instructorAuth(mockRequest, mockResponse, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      "validAccessToken",
      process.env.JWT_SECRET
    );
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unauthorized user",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
}); 