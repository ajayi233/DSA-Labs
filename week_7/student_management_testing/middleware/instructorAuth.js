const jwt = require("jsonwebtoken");

const instructorAuth = (req, res, next) => {
  console.log("instructor auth");
  let accessToken;
  if (req.headers && req.headers.authorization) {
    accessToken = req.headers.authorization.split(" ")[1];
  } else {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized user",
    });
    return;
  }
  const accessBadge = jwt.verify(accessToken, process.env.JWT_SECRET);

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
