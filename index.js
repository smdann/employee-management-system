// Required packages / file paths
const inquirer = require("inquirer");
const path = require("path");
const mysql = require("mysql2");
const myRootPW = require("./rootPassword");
const cTable = require('console.table');

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

// Prompts for user
const employeeManager = () => {
  console.log("Welcome to the Employee Management System.");

  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userSelection",
      choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
  ]) 
  
  .then((response) => {
    const userResponse = response.userSelection;
    if (userResponse === "Add Employee") {
      console.log("Add employee selected by user")
      addEmployee()
    }
    if (userResponse === "Update Employee Role") {
      updateRole()
    }
    if (userResponse === "View All Roles") {
      viewRoles()
    }
    if (userResponse === "Add Role") {
      addRole()
    }
    if (userResponse === "View All Departments") {
      viewDepartments()
    }
    if (userResponse === "Add Department") {
      addDepartment()
    } 
    if (userResponse === "Quit") {
      quitApplication()
    }
  })
};

employeeManager()