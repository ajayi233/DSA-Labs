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
available BOOLEAN,
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

module.exports = createBookTable;

class Books {
  constructor(
    title,
    genreID,
    author,
    publisher,
    yearPublished,
    available,
    copies
  ) {
    this.title = title;
    this.genreID = genreID;
    this.author = author;
    this.publisher = publisher;
    this.yearPublished = yearPublished;
    this.available = available;
    this.copies = copies;
  }

  // books functions

  static getAllBooks = () => {
    const rows = mySqlPool.query(`SELECT * FROM books`);
    return rows[0];
  };
}
