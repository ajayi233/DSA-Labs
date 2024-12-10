exports.errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).json({
      success: false,
      error: error.message ? error.message : error,
    });
  }
  next();
};
