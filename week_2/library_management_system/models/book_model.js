const mySqlPool = require("./db_connector");

const createBookTable = async () => {
  const bookQuery = `CREATE TABLE IF NOT EXISTS books(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description VARCHAR(255),
genreID INT NOT NULL,
author VARCHAR(255) NOT NULL,
publisher VARCHAR(255) NOT NULL,
yearPublished INT NOT NULL,
available BOOLEAN default true,
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
  const row= await mySqlPool.query(bookQuery, values);
  return row;
};

const addBook = async (book) => {
  const bookQuery = `INSERT INTO books(title, description, genreID, author, publisher, yearPublished, available, copies) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    book.title,
    book.description,
    book.genreID,
    book.author,
    book.publisher,
    book.yearPublished,
    book.available,
    book.copies,
  ];
  const row = await mySqlPool.query(bookQuery, values);
  return row;
}
module.exports = { createBookTable, getBookById,updateBookCopies };
