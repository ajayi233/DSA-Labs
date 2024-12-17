const mysql = require("mysql2");

// Create the connection to database
const mySqlPool = mysql
  .createPool({
    host: "127.0.0.1",
    port: 3306,
    password: "1234",
    user: "root",
    database: "library_system",
  })
  .promise();

module.exports = mySqlPool;
