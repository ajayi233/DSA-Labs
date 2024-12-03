const express = require("express");
const {
  addBookPage,
  addBook, // post request
  deleteBookPage,
  deleteBook, // post request
  updateBookPage,
  updateBook, // put request
  borrowBookPage,
  viewBookPage,
  viewBook, // post request
} = require("../controllers/bookControllers");
const { checkParams } = require("../middleware/paramsCheck");

const bookRouter = express.Router();

//page rendering
//protecting these routes for the admin / librarian
bookRouter.get("/addBook", addBookPage);
bookRouter.get("/borrowBook/:bookId", borrowBookPage);
bookRouter.get("/updateBook", updateBookPage);
bookRouter.get("/deleteBook/:key", checkParams, deleteBookPage);
bookRouter.get("/updateBook", updateBookPage);
bookRouter.get("/viewBooks/:bookId", viewBookPage);

//post and put requests
bookRouter.post("/addBook", addBook);
bookRouter.post("/viewBooks/", viewBook);
bookRouter.post("/borrowBook", borrowBookPage);
bookRouter.put("/updateBook/:bookId", updateBook);
bookRouter.post("/deleteBook/:key", checkParams, deleteBook);

module.exports = bookRouter;
