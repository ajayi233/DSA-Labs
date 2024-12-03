const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mySqlPool = require("./models/db_connector");
const createBookTable = require("./models/book_model");
const user_model = require("./models/user_model");
const createReservationTable = require("./models/reservation_model");
const createTransactionTable = require("./models/transaction_model");
const createGenreTable = require("./models/genre");
const router = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const bookModel = require("./models/book_model");
const transactionModel = require("./models/transaction_model");
const transactionRoutes = require("./routes/transactionRoutes");

//initializing express
const app = express();

//adding middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("index");
});


//user routes
app.use("/users", router);

//book routes
app.use("/books", bookRouter);
app.use("/transactions", transactionRoutes);
//404
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statuCode : 500;

  res.status(statusCode).json({
    status: "failed",
    message: err.message,
    stack: err.stack,
  });
});

//table creation
bookModel.createBookTable();
user_model.createUserTable();
createReservationTable();
transactionModel.createTransactionTable();
createGenreTable();

// creating server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
