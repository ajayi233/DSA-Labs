const jwt = require("jsonwebtoken");

const instructorAuth = (req, res, next) => {
  console.log("instructor auth");
  const accessToken = req.headers.authorization.split(" ")[1];
  const accessBadge = jwt.verify(accessToken, process.env.JWT_SECRET);
  console.log(accessBadge);

  if (!accessBadge || accessBadge.role === "student") {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized user",
    });
    return;
  }
  req.user = accessBadge;
  console.log(req.user);
  next();
};
module.exports = instructorAuth;
