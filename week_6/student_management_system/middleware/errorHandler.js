const logger = require("../utils/logger");
exports.errorHandler = (error, req, res, next) => {
  logger.error({
    message: error.message,
    url: req.url,
    method: req.method,
  });
  if (error) {
    res.status(400).json({
      success: false,
      stack: error.stack,
      error: error.message ? error.message : error,
    });
  }
  next();
};
