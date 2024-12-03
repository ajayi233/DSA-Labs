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

exports.viewBookPage = (req, res) => {
  res.status(200).render("../views/bookRelatedPages/viewBook.ejs");
};

exports.borrowBook = async (req, res, next) => {
  try {
    const { bookId, userId } = req.body;
    if (!bookId || !userId) {
      throw new Error("All fields are required");
    }
    const result = await book_model.borrowBook(bookId, userId);
    res.status(200).json({ status: "success", message: "Book borrowed" });
  } catch (err) {
    next(err);
  }
};
