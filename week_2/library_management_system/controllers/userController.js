const user_model = require("../models/user_model");
const mySqlPool = require("../models/db_connector");
const book_model = require("../models/book_model");

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
exports.viewAllUsers = (req, res, next) => {
  // res.status(200).render("../views/viewUsers.ejs");

  mySqlPool
    .execute(
      `
      SELECT * FROM users
    `
    )
    .then(([result]) => {
      res.status(200).render("../views/viewUsers", { users: result });
    })
    .catch((error) => {
      next(error);
    });
};

//user dashboard
exports.usersHome = async (req, res, next) => {
  try {
    // Fetch book data from the database
    const [books] = await mySqlPool.execute(
      `
    SELECT 
    books.title,
    genreName AS genre,
    books.author,
    books.publisher,
    books.yearPublished
FROM 
    books
INNER JOIN 
    genre
ON 
    books.genreID = genre.genreId;

    `
    );

    // Render userDashboard.ejs and pass the book data
    res.render("../views/userHome", { books });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

//user past transactions
exports.userTransactions = (req, res) => {
  const [transactions] = mySqlPool.execute(
    `
    SELECT * FROM transactions WHERE userID = ?
    `,
    [req.user.userId]
  );
  res.status(200).render("../views/userTransactions.ejs");
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

    res
      .status(200)
      .json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

//user login
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const result = await user_model.login(email, password);
    // console.log(result)
    if (!result.length > 0) {
      throw new Error("enter valid credentials");
    }

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      role: result[0].role,
    });
  } catch (err) {
    next(err);
  }
};

//user reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      throw new Error("All fields are required");
    }
    const result = await user_model.resetPassword(password);
    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

//user logout
exports.userLogout = async (req, res, next) => {
  try {
    res.status(200).redirect("/users/login");
  } catch (err) {
    next(err);
  }
};

//admin login page completed
exports.adminLogin = (req, res) => {
  try {
    res.status(200).render("../views/adminHome.ejs");
  } catch (err) {
    throw err ? err.message : err;
  }
};
