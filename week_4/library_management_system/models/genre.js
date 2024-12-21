const mySqlPool = require("./db_connector");

const createGenreTable = async () => {
  const genreQuery = `CREATE TABLE IF NOT EXISTS genre(
        genreId INT AUTO_INCREMENT PRIMARY KEY,
        genreName VARCHAR(255) NOT NULL,
        description VARCHAR(255)
    )
    `;

  mySqlPool
    .query(genreQuery)
    .then((result) => {
      console.log("genre table created");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = createGenreTable;
