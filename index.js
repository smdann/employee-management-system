// Required packages / file paths
const inquirer = require("inquirer");
const path = require("path");
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: ""
  }
);
