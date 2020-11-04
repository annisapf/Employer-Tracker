const mysql = require('mysql');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');

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

    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
                    "Add a Role",
                    "Update Employee Roles",
                ]
            }
        ])
        .then((answer) => {
            switch (answer.start) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Employees by Department":
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
                case "Add a Role":
                    addRole();
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
    const query = "SELECT first_name, last_name FROM employee";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewDeparments = () => {
    const query = "SELECT * FROM department;"
    connection.query(
        query, (err, res) => {
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

};

const addEmployee = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const updateRole = () => {

};
