require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
require("./model/student");
require("./model/instructor");
require("./model/course");
require("./model/enrollment");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      console.log("Application is live on http://localhost:${PORT}");
    });
  })
  .catch((err) => {
    console.log(err);
  });
