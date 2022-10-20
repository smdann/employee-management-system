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
      choices: 
        [
          "View All Employees", 
          "Add Employee", 
          "Update Employee Role", 
          "View All Roles", 
          "Add Role", 
          "View All Departments", 
          "Add Department", 
          "Quit"
        ],
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
  // Query to select employee information by joining the table data
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
  // Query the roles
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({
      name: role.title,
      value: role.id
    }));
  // Query the employees
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    let managers = res.map((manager) => ({
      name: manager.first_name + " " + manager.last_name,
      value: manager.id
    }));
      // Prompts to gather new employee information
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
      // Add new employee data to the employee table
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

          employeeManager()
        })
      });
    });
  });
};

// For the roles you want to query the departments so they show up in the choices and for the update employee you want to query the employees and roles. 

// Update employee role
const updateRole = () => {
  // Query the employees
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    let employees = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id
    }));
  
  // Query the roles
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({
      name: role.title,
      value: role.id
    }));
  
    // Prompts to gather updated employee information
    inquirer.prompt([
      {
        type: "list",
        message: "Select an employee to update their role.",
        name: "updateEmployee",
        choices: employees,
      },
      {
        type: "list",
        message: "Select a new role for this employee.",
        name: "newEmployeeRole",
        choices: roles,
      }
    ])
    // Replace employee role data in the database
    .then((answers) => {
      db.query(`REPLACE INTO employee SET ?`,
      {
        role_id: answers.newEmployeeRole
      },
      (err, res) => {
        if (err) throw err;
        console.log(`\n The role was successfully updated.`);

        employeeManager()
      })
    })
  }); 
});
};

// View all roles
const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    employeeManager()
  });
};

// Add a role
const addRole = () => {
  // Query the departments
  // db.query("SELECT * FROM department", (err, res) => {
  //   if (err) throw err;
  //   let departments = res.map((department) => ({
  //     name: department.name,
  //     value: department.id
  //   }));
  // Query to get department ID when department is selected
  db.query("SELECT distinct name, department_id FROM employee_db.department INNER JOIN employee_db.role ON employee_db.department.id = employee_db.role.department_id", (err, res) => {
    if (err) throw err;
    let departments = res.map((department) => ({
      name: department.name,
      value: department.department_id
    }));
  

    // Prompts to gather new role information
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the title for this role.",
        name: "roleTitle",
      },
      {
        type: "list",
        message: "Select the department in which this role belongs to.",
        name: "roleDepartment",
        choices: departments,
      },
      {
        type: "input",
        message: "Enter the salary for this role.",
        name: "roleSalary",
      }
    ])
    // Add new role data into the role table
    .then((answers) => {
      db.query(`INSERT INTO role SET ?`,
      {
        title:answers.roleTitle,
        salary:answers.roleSalary,
        department_id:answers.roleDepartment
      },
      (err, res) => {
        if (err) throw err;
        console.log(`\n ${answers.roleTitle} was successfully added to the database! \n`);

        employeeManager()
      })
    })
  });
};

// View all departments
const viewDepartments = () => {
  db.query("SELECT id, name AS Department FROM department", function (err, results) {
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
  .then((answers) => {
    db.query(`INSERT INTO department SET ?`,
    { name:answers.departmentName },

    (err, res) => {
      if (err) throw err;
      console.log(`\n ${answers.departmentName} was successfully added to the database! \n`);

      employeeManager();
    })
  })
};

// Quit
const quitApplication = () => {

};