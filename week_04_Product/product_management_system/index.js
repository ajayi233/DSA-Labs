require("express-async-errors");
const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
require("./model/userModel");
require("./model/productModel");
require("./model/categoryModel");
const { errorHandler } = require("./middleware/errorHandler");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const session = require("express-session");

const app = express();

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

//setting up view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// routes
app.use("", viewRouter);
app.use("/admin", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);

// error handler after all routes are defined
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 4000;
const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("...........Database connected successfully...........");
    app.listen(PORT, () => {
      console.log(
        `Application is live on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
