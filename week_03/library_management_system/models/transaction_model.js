const mySqlPool = require("./db_connector");

const createTransactionTable = async () => {
  const transactionQuery = `CREATE TABLE IF NOT EXISTS transactions(
        transactionId INT AUTO_INCREMENT PRIMARY KEY,
        bookId INT NOT NULL,
        userId INT NOT NULL,
        borrowDate DATE NOT NULL,
        returnDate DATE,
        isReturned BOOLEAN default false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

  mySqlPool
    .query(transactionQuery)
    .then((result) => {
      console.log("transaction table created");
    })
    .catch((err) => {
      console.log(err);
    });
};

const createTransaction = async (bookId, userId, borrowDate) => {
  const transactionQuery = `INSERT INTO transactions (bookId, userId, borrowDate) VALUES (?, ?, ?)`;
  const values = [bookId, userId, borrowDate];
  const transactionRow = await mySqlPool.query(transactionQuery, values);
  return transactionRow[0];
};

const viewUserTransactions = async (userId) => {
  const transactionQuery = `SELECT * FROM transactions WHERE userId = ?`;
  const values = [userId];
  const transactionRow = await mySqlPool.query(transactionQuery, values);
  return transactionRow[0];
};

module.exports = { createTransactionTable, createTransaction };
