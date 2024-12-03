const mySqlPool = require("../models/db_connector");
const book_model = require("../models/book_model");

//page rendering
exports.addBookPage = (req, res) => {
  res.status(200).render("../views/bookRelatedPages/addBook.ejs");
};

exports.updateBookPage = (req, res) => {
  res.status(200).render("../views/bookRelatedPages/updateBook.ejs");
};

exports.deleteBookPage = (req, res) => {
  res.status(200).render("../views/bookRelatedPages/deleteBook.ejs");
};

exports.getBooksPage = (req, res) => {
  res.status(200).render("../views/bookRelatedPages/getBooks.ejs");
};
