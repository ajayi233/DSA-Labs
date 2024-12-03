const express = require("express");
const {
  addBookPage,
  deleteBookPage,
  updateBookPage,
} = require("../controllers/bookControllers");
const { checkParams } = require("../middleware/paramsCheck");

const bookRouter = express.Router();

//page rendering
//protecting these routes for the admin / librarian
bookRouter.get("/addBook", addBookPage);
bookRouter.get("/updateBook", updateBookPage);
bookRouter.get("/deleteBook/:key", checkParams, deleteBookPage);

//post requests

module.exports = bookRouter;
