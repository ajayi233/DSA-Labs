const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

exports.auth = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) throw "not allowed";
    const accessBadge = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(accessBadge);
    const currentUser = await userModel
      .findById(accessBadge.id)
      .select("-password");
    // console.log(currentUser);
    if (!currentUser) throw "not allowed";
    //user asscess keys
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
