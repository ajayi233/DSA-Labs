const { updateBookCopies } = require("../models/book_model");
const { createTransaction } = require("../models/transaction_model");
const { borrowBook } = require("../models/user_model");

const mySqlPool = require("../models/db_connector");

exports.createTransaction = async function (req, res, next) {
  try {
    const userId = req.body.userId;
    const bookId = req.params.bookId;
    const borrowDate = new Date(Date.now());
    const result = await createTransaction(bookId, userId, borrowDate);
    if (result.affectedRows === 0) throw new Error("Book not found");
    const bookResult = await borrowBook(userId);
    if (bookResult.affectedRows === 0) throw new Error("User not found");
    await updateBookCopies(bookId);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

exports.history = async function (req, res, next) {
  try {
    const data = await mySqlPool
      .execute(`SELECT * FROM transactions`)
      .then(([result]) => result);
    res.render("../views/bookRelatedPages/transaction.ejs", {
      transactions: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.userHistory = async function (req, res, next) {
  try {
    const userId = 5; //hardcoded to fetch user history
    const data = await mySqlPool
      .execute(`SELECT * FROM transactions WHERE userID = ?`, [userId])
      .then(([result]) => result);
    res.render("../views/bookRelatedPages/transaction.ejs", {
      transactions: data,
    });
  } catch (err) {
    next(err);
  }
};
