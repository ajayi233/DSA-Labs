const mySqlPool = require("./db_connector");

const createBookTable = async () => {
  const bookQuery = `CREATE TABLE IF NOT EXISTS books(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
genreID INT NOT NULL,
author VARCHAR(255) NOT NULL,
publisher VARCHAR(255) NOT NULL,
yearPublished INT NOT NULL,
available BOOLEAN DEFAULT TRUE,
copies INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

  mySqlPool
    .query(bookQuery)
    .then((result) => {
      console.log("books table created");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBookById = async (id) => {
  const bookQuery = `SELECT * FROM books WHERE id = ? `;
  const row = await mySqlPool.query(bookQuery, [id]);
  return row[0];
};

const updateBookCopies = async (id) => {
  const bookQuery = `UPDATE books SET copies = copies-1 WHERE id = ?`;
  const values = [id];
  const row = await mySqlPool.query(bookQuery, values);
  return row;
};

const addBook = async (book) => {
  const bookQuery = `INSERT INTO books (title, genreID, author, publisher, yearPublished, copies,description) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    book.title,
    book.genreID,
    book.author,
    book.publisher,
    book.yearPublished,
    book.copies,
    book.description,
  ];
  const row = await mySqlPool.query(bookQuery, values);
  return row;
};

module.exports = { createBookTable, getBookById, updateBookCopies, addBook };
