// Required packages / file paths
const inquirer = require("inquirer");
const path = require("path");
const cTable = require('console.table');
const db = require("./db/connection");


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
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
  function (err, employees) {
    if (err) throw err
    console.table(employees);
    employeeManager()
  })
};

 /*
"SELECT * FROM employee_db.employee em LEFT OUTER JOIN employee_db.role ro ON em.id = ro.id LEFT OUTER JOIN employee_db.department de ON ro.department_id = de.id LEFT OUTER JOIN employee_db.employee manager ON em.first_name = em.manager_id"
*/

// Add an employee
const addEmployee = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({
      name: role.title,
      value: role.id
    }));
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    let managers = res.map((manager) => ({
      name: manager.first_name + " " + manager.last_name,
      value: manager.id
    }));
  
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
          type: "list",
          message: "Select the employee's role.",
          name: "employeeRole",
          choices: roles,
        },
        {
          type: "list",
          message: "Select the employee's manager.",
          name: "employeeManager",
          choices: managers,
        }
      ]) 
      .then((answers) => {
        db.query(`INSERT INTO employee SET ?`, 
        {
          first_name:answers.firstName, 
          last_name:answers.lastName,
          role_id:answers.employeeRole,
          manager_id:answers.employeeManager
        },
        (err, res) => {
          if (err) throw err;
          console.log(`\n ${answers.firstName} ${answers.lastName} was successfully added to the database! \n`);

          employeeManager();
        })
      });
    });
  });
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
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the department name.",
      name: "departmentName",
    },
  ])
};

// Quit
const quitApplication = () => {

};