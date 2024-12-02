const mySqlPool = require("./db_connector");

const createUserTable = async () => {
  const userQuery = `CREATE TABLE IF NOT EXISTS users(
        userId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        role enum('admin', 'user') default 'user',
        password VARCHAR(255) NOT NULL,
        borrowed_books INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

  mySqlPool
    .query(userQuery)
    .then((result) => {
      console.log("user table created");
    })
    .catch((err) => {
      console.log(err);
    });
};

class Users {
  constructor(name, email, phone, role, password, borrowed_books) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.password = password;
    this.borrowed_books = borrowed_books;
  }

  static async createUser() {
    const userQuery = `INSERT INTO users(name, email, phone, role, password, borrowed_books) VALUES(?, ?, ?, ?, ?, ?)`;
    const values = [
      this.name,
      this.email,
      this.phone,
      this.role,
      this.password,
      this.borrowed_books,
    ];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static getAllUsers() {
    const rows = mySqlPool.query(`SELECT * FROM users`);
    return rows[0];
  }

  static getUserById(userId) {
    const rows = mySqlPool.query(`SELECT * FROM users WHERE userId = ?`, [
      userId,
    ]);
    return rows[0];
  }

  static async updateUser(userId) {
    const userQuery = `UPDATE users SET name = ?, email = ?, phone = ?, role = ?, password = ?, borrowed_books = ? WHERE userId = ?`;
    const values = [
      this.name,
      this.email,
      this.phone,
      this.role,
      this.password,
      this.borrowed_books,
      userId,
    ];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static async deleteUser(userId) {
    const userQuery = `DELETE FROM users WHERE userId = ?`;
    const values = [userId];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static async login(email, password) {
    const userQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const values = [email, password];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static async logout(userId) {
    const userQuery = `UPDATE users SET borrowed_books = 0 WHERE userId = ?`;
    const values = [userId];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static async borrowBook(userId, bookId) {
    const userQuery = `UPDATE users SET borrowed_books = borrowed_books + 1 WHERE userId = ?`;
    const values = [userId];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }

  static async returnBook(userId, bookId) {
    const userQuery = `UPDATE users SET borrowed_books = borrowed_books - 1 WHERE userId = ?`;
    const values = [userId];
    const userRow = await mySqlPool.query(userQuery, values);
    return userRow[0];
  }
}

// admin (librarian) operations on user manipulation only

// users CRUD operations controllers

//1. registring users
const createNewUser = async (
  name,
  email,
  phone,
  role,
  password,
  borrowed_books
) => {
  const userQuery = `INSERT INTO users(name, email, phone, role, password, borrowed_books) VALUES(?, ?, ?, ?, ?, ?)`;
  const values = [name, email, phone, role, password, borrowed_books];
  const userRow = await mySqlPool
    .query(userQuery, values)
    .then((result) => {
      console.log("object");
    })
    .catch((err) => {
      console.log(err);
    });
  return userRow;
};

//2. logging in users
const login = async (email, password) => {
  const userQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const values = [email, password];
  const userRow = await mySqlPool
    .query(userQuery, values)
    .then((result) => {
      console.log("logged in");
    })
    .catch((err) => {
      console.log(err);
    });
  return userRow;
};

//3. logging out users
const logout = async (userId) => {
  const userQuery = `UPDATE users SET borrowed_books = 0 WHERE userId = ?`;
  const values = [userId];
  const userRow = await mySqlPool
    .query(userQuery, values)
    .then((result) => {
      console.log("object");
    })
    .catch((err) => {
      console.log(err);
    });
  return userRow;
};

//3. updating user profile
const updateUser = async (userId) => {
  const userQuery = `UPDATE users SET name = ?, email = ?, phone = ?, role = ?, password = ?, borrowed_books = ? WHERE userId = ?`;
  const values = [
    this.name,
    this.email,
    this.phone,
    this.role,
    this.password,
    this.borrowed_books,
    userId,
  ];
  const userRow = await mySqlPool
    .query(userQuery, values)
    .then((result) => {
      console.log("object");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  Users,
  createUserTable,
  createNewUser,
};
