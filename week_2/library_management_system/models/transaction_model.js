const mySqlPool = require("./db_connector");

const createTransactionTable = async () => {
  const transactionQuery = `CREATE TABLE IF NOT EXISTS transactions(
        transactionId INT AUTO_INCREMENT PRIMARY KEY,
        bookId INT NOT NULL,
        userId INT NOT NULL,
        borrowDate DATE NOT NULL,
        returnDate DATE NOT NULL,
        isReturned BOOLEAN,
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

module.exports = createTransactionTable;
