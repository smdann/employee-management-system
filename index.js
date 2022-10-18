// Required packages / file paths
const inquirer = require("inquirer");
const path = require("path");
const mysql = require("mysql2");
const myRootPW = require("./rootPassword");

// Connect to the employee database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: myRootPW,
    database: "employee_db"
  },
  console.log(`Connected to database.`)
);
