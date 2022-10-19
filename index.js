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

// Prompt for user to select what to do
const employeeManager = () => {
  console.log("Welcome to the Employee Management System.");

  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userSelection",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
  ]) 
  
  // Runs function based on user's selection
  .then((response) => {
    const userResponse = response.userSelection;
    if (userResponse === "View All Employees") {
      console.log("User selected view all employees")
      viewEmployees()
    }
    if (userResponse === "Add Employee") {
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

// View all employees
const viewEmployees = () => {
  db.query("SELECT * FROM employee_db.employee em LEFT OUTER JOIN employee_db.role ro ON em.id = ro.id LEFT OUTER JOIN employee_db.department de ON ro.department_id = de.id",
  function (err, employees) {
    if (err) throw err
    console.table(employees);
    employeeManager()
  })
};

// Add an employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's first name.",
      name: "firstName",
    },
    {
      type: "input",
      message: "Enter the employee's last name.",
      name: "lastName",
    },
    {
      type: "input",
      message: "Select the employee's role.",
      name: "employeeRole",
      choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
    },
    {
      type: "input",
      message: "Select the employee's manager.",
      name: "employeeManager",
      choices: ["None", "John Doe", "Ashley Rodriguez", "Kunal Sing", "Sarah Lourd"],
    }
  ])
};

// Update employee role
const updateRole = () => {

};

// View all roles
const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    employeeManager()
  })
};

// Add a role
const addRole = () => {

};

// View all departments
const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    employeeManager()
  })
};

// Add a department
const addDepartment = () => {

};

// Quit
const quitApplication = () => {

};