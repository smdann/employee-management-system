
# Employee Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Description

The Employee Management System is a command-line application that allows the user to manage an employee database. This is accomplished using MySQL Workbench, Node.js, Inquirer.js, mysql2, and console.table.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation 

This application uses MySQL Workbench, Node.js, Inquirer.js, mysql2, and console.table. 

* Please use `npm i` to install the required packages.

* To create the tables for the database, add the schema.sql and seeds.sql file data to your MySQL Workbench.

* See the .envEXAMPLE file for the information needed to secure your connection to the employee database.

Run `node index.js` to start the application.

## Usage 

The Employee Management System begins with prompting the user to select what they would like to do.

* The options include: "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Delete Employee", and "Delete Role".

After making the initial selection, the user is prompted to enter information needed for that particular task.

Once the information is acquired from the user, data is either added, modified, or deleted from the employee database. If the user opts to view something, the data is pulled from the database and displayed in a table.

The following information is available for each employee in the database:

* Employee ID

* First and last name

* Title

* Department

* Salary

* Manager

The Employee Management System is an essential tool for business owners looking to manage employees, roles, and departments in their company.

[Walkthrough Video]()

![Employee Management System Screenshot](./)

## License 

The Employee Management System is available under the MIT license.

Please see [LICENSE](./LICENSE) for the full details of the license.

## Contributing 

The contributors of this application have adopted the Contributor Covenant Code of Conduct. Please visit the [Code of Conduct](./CODE_OF_CONDUCT) page for details.

## Tests 

This application doesn't have any tests at this time.

## Questions 

Please reach out via the the link below with any additional questions. 

[GitHub](https://github.com/smdann)
