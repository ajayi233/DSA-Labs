const jwt = require("jsonwebtoken");

const studentAuth = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const accessBadge = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!accessBadge) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized, please login",
    });
    return;
  }
  req.user = accessBadge;
  next();
};

module.exports = studentAuth;
