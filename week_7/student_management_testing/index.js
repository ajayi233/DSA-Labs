require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const studentRouter = require("./routes/student");
const courseRouter = require("./routes/course");
const enrollmentRouter = require("./routes/enrollment");
const instructorRouter = require("./routes/instructor");
const authRouter = require("./routes/auth");
const sortRouter = require("./routes/sort");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const { connectRedis } = require("./utils/redis");
const hpp = require("hpp");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

const app = express();

// connectRedis(); //connecting to redis

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());

//routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Student Management System",
  });
});
//various entities routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/instructors", instructorRouter);
app.use("/auth", authRouter);
app.use("/sort", sortRouter);

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
//database is commented to avoid connection to the database
// mongoose
//   .connect(dbURI)
//   .then(() => {
//     console.log("...........Database connected successfully...........");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const server = app.listen(PORT, () => {
  console.log(`API is live on http://localhost:${PORT}`);
});

module.exports = { server, app };
