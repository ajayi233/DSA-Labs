const user_model = require("../models/user_model");

//page rendering
exports.signupPage = (req, res) => {
  res.status(200).render("../views/signup.ejs");
};
exports.loginPage = (req, res) => {
  res.status(200).render("../views/login.ejs");
};
exports.forgotPasswordPage = (req, res) => {
  res.status(200).render("../views/forgotPassword.ejs");
};
exports.resetPasswordPage = (req, res) => {
  res.status(200).render("../views/resetPassword.ejs");
};
exports.viewAllUsers = (req, res) => {
  res.status(200).render("../views/viewUsers.ejs");
};

//user registration
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
      throw new Error("All fields are required");
    }

    const result = await user_model.createNewUser(
      name,
      email,
      phone,
      role,
      password,
      0
    );
    console.log(result);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//user login
exports.userLogin = async () => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const result = await user_model.login(email, password);
    if (result.length > 0) {
      res.status(200).json({ message: "User logged in successfully" });
      res.render("../views/userHome.ejs");
    }
  } catch (err) {
    console.log(err);
  }
};

//user logout
exports.userLogout = async (req, res) => {
  try {
    console.log("object");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

//admin login
exports.adminLogin = (req, res) => {
  try {
    res.status(200).render("../views/adminHome.ejs");
  } catch (err) {
    throw err ? err.message : err;
  }
};
