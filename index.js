const mysql = require('mysql');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
require('dotenv').config();

const longText = 'by Annisa';

console.log(
    logo({
        name: 'Employer Tracker',
        font: 'Cybermedium',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'magenta',
        logoColor: 'bold-magenta',
        textColor: 'magenta',
    })
        .emptyLine()
        .right('version 1.0')
        .emptyLine()
        .center(longText)
        .render()
);

var connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: "root",
    password: "mrsbudiman",
    database: "employer_tracker_db"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    start();
});


const start = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Role",
                    "Add an Employee",
                    "Add a Department",
                    "Update Employee Roles"
                ]
            }
        ])
        .then((answer) => {
            switch (answer.start) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Employees by Department":
                    console.log("view testing");
                    viewDeparments();
                    break;
                case "View All Employees by Role":
                    viewRoles();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;

                case "Update Employee Roles":
                    updateRole();
                    break;
                default:

                    connection.end();
            }
        });
}

const viewEmployees = () => {
    const query = "SELECT employee.role_id,employee.first_name, employee.last_name, role.title, employee.manager_id,role.salary FROM employee,role where employee.role_id = role.id;";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewDeparments = () => {
    console.log("testing view department");
    const query = "SELECT * FROM department;"
    connection.query(
        query, (err, res) => {
            console.log(err + ": " + res);
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "list",
                        message: "Which Department would you like to view?",
                        choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name)
                            }
                            return choiceArray;
                        }
                    }])
                .then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query, [{
                            "department.name": data.choice
                        }], (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            start();
                        }
                    )
                })
        }
    )
};

const viewRoles = () => {
    const query = "SELECT id, title, salary FROM role";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of deparment?'
        })
        .then(function (data) {
            const query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: data.departmentName
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + ' department added\n')
                    start();
                }
            )
        })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the Employees First Name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the Employees Last Name?"
            },
            {
                name: "choice",
                type: "list",
                message: "What is this employee's title?",
                choices: [
                    "CEO",
                    "CMO",
                    "COO",
                    "CTO",
                    "CFO",
                    "Sales Team Lead",
                    "Salesperson",
                    "Marketing Manager",
                    "Controller",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer",
                    "Engineer Team Lead",
                    "Software Engineer"
                ]
            }
        ]).then(data => {
            switch (data.choice) {
                case "CEO":
                    var roleID = 1;
                    break;
                case "CMO":
                    var roleID = 2;
                    break;
                case "COO":
                    var roleID = 3;
                    break;
                case "CTO":
                    var roleID = 4;
                    break;
                case "CFO":
                    var roleID = 5;
                    break;
                case "Sales Team Lead":
                    var roleID = 6;
                    break;
                case "Salesperson":
                    var roleID = 7;
                    break;
                case "Marketing Manager":
                    var roleID = 8;
                    break;
                case "Controller":
                    var roleID = 9;
                    break;
                case "Accountant":
                    var roleID = 10;
                    break;
                case "Legal Team Lead":
                    var roleID = 11;
                    break;
                case "Lawyer":
                    var roleID = 12;
                    break;
                case "Engineer Team Lead":
                    var roleID = 13;
                    break;
                case "Software Engineer":
                    var roleID = 14;
                    break;
            }

            const query = "INSERT INTO employee SET ?;"
            connection.query(
                query, {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: roleID
            }, err => {
                if (err) throw err;
                console.log("Employee is successfully added")
                start();
            });
        });
};

const updateRole = () => {
    const query = "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;"
    connection.query(
        query, (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which Employee would you like to update?",
                        name: "selectEmployee",
                        choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name);
                            }
                            return choiceArray;
                        }
                    },
                    {
                        name: "choice",
                        type: "list",
                        message: "What is this employee's title?",
                        choices: [
                            "CEO",
                            "CMO",
                            "COO",
                            "CTO",
                            "CFO",
                            "Sales Team Lead",
                            "Salesperson",
                            "Marketing Manager",
                            "Controller",
                            "Accountant",
                            "Legal Team Lead",
                            "Lawyer",
                            "Engineer Team Lead",
                            "Software Engineer"
                        ]
                    }
                ])
                .then(data => {
                    switch (data.choice) {
                        case "CEO":
                            var roleID = 1;
                            break;
                        case "CMO":
                            var roleID = 2;
                            break;
                        case "COO":
                            var roleID = 3;
                            break;
                        case "CTO":
                            var roleID = 4;
                            break;
                        case "CFO":
                            var roleID = 5;
                            break;
                        case "Sales Team Lead":
                            var roleID = 6;
                            break;
                        case "Salesperson":
                            var roleID = 7;
                            break;
                        case "Marketing Manager":
                            var roleID = 8;
                            break;
                        case "Controller":
                            var roleID = 9;
                            break;
                        case "Accountant":
                            var roleID = 10;
                            break;
                        case "Legal Team Lead":
                            var roleID = 11;
                            break;
                        case "Lawyer":
                            var roleID = 12;
                            break;
                        case "Engineer Team Lead":
                            var roleID = 13;
                            break;
                        case "Software Engineer":
                            var roleID = 14;
                            break;
                    }
                    const employee = data.selectEmployee.split(" ");
                    const query = "UPDATE employee SET ? WHERE ? AND ?";
                    connection.query(
                        query, [
                        {
                            role_id: roleID
                        },
                        {
                            first_name: employee[0]
                        },
                        {
                            last_name: employee[1]
                        }
                    ], err => {
                        if (err) throw err;
                        console.log("Employee Is Successfully Updated!");
                        start();
                    });
                });
        });
};

