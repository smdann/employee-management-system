require("dotenv").config();
const mysql = require("mysql2");


// Connect to the employee database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: "employee_db"
  },
  console.log(`Connected to database.`)
);

module.exports = db