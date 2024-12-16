require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const studentRouter = require("./routes/student");
const courseRouter = require("./routes/course");
const enrollmentRouter = require("./routes/enrollment");
const instructorRouter = require("./routes/instructor");

const app = express();

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Student Management System",
  });
});
//various entities routes
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/instructors", instructorRouter);

//404
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Page not found",
  });
});

//error handler
app.use(errorHandler);

//connecting to db
const PORT = process.env.PORT;
const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("...........Database connected successfully...........");
    app.listen(3000, () => {
      console.log(`Application is live on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
