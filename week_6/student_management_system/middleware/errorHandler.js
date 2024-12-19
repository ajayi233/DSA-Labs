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
      error: error.message ? error.message : error,
    });
  }
  next();
};
