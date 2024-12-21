const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

exports.adminSignup = async (req, res) => {
  const userModel = mongoose.model("users");
  const { name, email, password } = req.body;

  //validation
  if (!name) throw "Username is required...";
  if (!email) throw "Email must be provided...";
  if (!password) throw "Password must be provided...";
  if (password.length < 6) throw "Password must at least 6 characters...";

  const getDuplicateEmail = await userModel.findOne({ email });
  if (getDuplicateEmail) throw "Email already exists...";

  const hashedPassword = await bcryptjs.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  //creating user after validation is passed
  const createUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  //routing to login page
  res.status(200).redirect("/login");
};
