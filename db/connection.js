require("dotenv").config();
const mysql = require("mysql2");


// Connect to the employee database
const db = mysql.createConnection(
  {
    host: process.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  console.log(`Connected to database.`)
);

module.exports = db