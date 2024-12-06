const adminSecretKey = process.env.ADMIN_SECRET_KEY;

exports.checkParams = (req, res, next) => {
  try {
    if (
      !req.params.key ||
      req.params.key === "" ||
      req.params.key !== adminSecretKey
    ) {
      throw new Error("Invalid key");
    }
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
