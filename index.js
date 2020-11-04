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
    password: "mrsbudiman",
    database: "employer_tracker_db"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    start();
});


function start() {
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
                    "Remove an Employee",
                    "Update Employee Role",
                    "View All Roles",
                ]
            }
        ])
}