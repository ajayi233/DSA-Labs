const { errorHandler } = require("../../../middleware/errorHandler");
const logger = require("../../../utils/logger");

jest.mock("../../../utils/logger", () => ({
  error: jest.fn(),
}));

describe("Error Handler Middleware", () => {
  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    mockRequest = {
      url: "/test-route",
      method: "GET",
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

  it("should log the error with the correct details", () => {
    const error = new Error("Test error");

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(logger.error).toHaveBeenCalledWith({
      message: error.message,
      url: "/test-route",
      method: "GET",
    });
  });

  it("should send a 400 status and error message if error exists", () => {
    const error = new Error("Test error");

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      error: "Test error",
    });
  });

  it("should send a 400 status and raw error if no message is provided", () => {
    const error = "Raw error string";

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      error: "Raw error string",
    });
  });

  it("should call next() after handling the error", () => {
    const error = new Error("Test error");

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
