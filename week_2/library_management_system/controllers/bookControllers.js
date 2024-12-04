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

exports.borrowBookPage = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const result = await book_model.getBookById(bookId);

    res
      .status(200)
      .render("../views/bookRelatedPages/borrowBook.ejs", { book: result[0] });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.viewBookPage = (req, res) => {
  const bookId = req.params.bookId;
  console.log(bookId);
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

exports.viewBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      throw new Error("All fields are required");
    }
    const result = await book_model.viewBook(bookId);
    if (bookId !== result[0].bookId) throw new Error("Book not found");

    res.status(200).json({ status: "success", message: "Book viewed" });
  } catch (err) {
    next(err);
  }
};

// adding a book
exports.addBook = async (req, res, next) => {
  try {
    const {
      title,
      genreID,
      author,
      publisher,
      yearPublished,
      copies,
      description,
    } = req.body;

    if (
      !title ||
      !genreID ||
      !author ||
      !publisher ||
      !yearPublished ||
      !copies ||
      !description
    ) {
      throw new Error("All fields are required");
    }

    const result = await book_model.addBook({
      title,
      genreID,
      author,
      publisher,
      yearPublished,
      copies,
      description,
    });
    if (result.affectedRows === 0) {
      throw new Error("Book not added");
    }
    res.status(200).json({ status: "success", message: "Book added" });
  } catch (err) {
    next(err);
  }
};

//deleting a book
exports.deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new Error("All fields are required");
    }
    const result = await book_model.deleteBook(bookId);
    res.status(200).json({ status: "success", message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};

//updating a book
exports.updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, publisher, yearPublished } = req.body;
    if (!bookId || !title || !author || !publisher || !yearPublished) {
      throw new Error("All fields are required");
    }
    const result = await book_model.updateBook(
      bookId,
      title,
      author,
      publisher,
      yearPublished
    );
    res.status(200).json({ status: "success", message: "Book updated" });
  } catch (err) {
    next(err);
  }

  // try {
  //   const { bookId, title, author, publisher, yearPublished } = req.body;
  //   if (!bookId || !title || !author || !publisher || !yearPublished) {
  //     throw new Error("All fields are required");
  //   }
  //   const result = await book_model.updateBook(
  //     bookId,
  //     title,
  //     author,
  //     publisher,
  //     yearPublished
  //   );
  //   res.status(200).json({ status: "success", message: "Book updated" });
  // } catch (err) {
  //   next(err);
  // }
};
