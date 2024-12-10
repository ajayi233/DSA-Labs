const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;

  //validation
  if (!email) throw "Email must be provided...";
  if (!password) throw "Password must be provided...";

  const getUser = await userModel.findOne({ email });
  if (!getUser) throw "User not found...";

  const checkPassword = await bcryptjs.compare(password, getUser.password);
  if (!checkPassword) throw "Incorrect password...";

  //jwt and session
  const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  req.session.token = token;
  // console.log(req.session);

  //routing to admin page
  res.status(200).redirect("/adminHome");
};

//logout
exports.adminLogout = (req, res) => {
  res.status(200).redirect("/login");
};
