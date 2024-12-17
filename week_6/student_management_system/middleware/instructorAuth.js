const jwt = require("jsonwebtoken");

const instructorAuth = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const accessBadge = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!accessBadge || accessBadge.role === "student") {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized user",
    });
    return;
  }
  next();
};
module.exports = instructorAuth;
