DROP DATABASE IF EXISTS employer_tracker_db;
CREATE DATABASE employer_tracker_db;
USE employer_tracker_db;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2),
    department_id INT,
    PRIMARY KEY (id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id)
);
INSERT INTO department (name)
VALUES ("Operations"),
    ("Sales"),
    ("Marketing"),
    ("Finance"),
    ("Legal"),
    ("Engineering");
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 350000, 1),
    ("CMO", 300000, 3),
    ("COO", 250000, 1),
    ("CTO", 320000, 6),
    ("CFO", 275000, 4),
    ("Sales Team Lead", 155000, 2),
    ("Salesperson", 60000, 2),
    ("Marketing Manager", 75000, 3),
    ("Controller", 100000, 4),
    ("Accountant", 800000, 4),
    ("Legal Team Lead", 150000, 5),
    ("Lawyer", 110000, 4),
    ("Engineer Team Lead", 135000, 6),
    ("Software Engineer", 85000, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Alden", "Remington", 1, NULL),
    ("Noel", "Pierce", 2, NULL),
    ("Clark", "Webb", 3, NULL),
    ("Edgar", "Babb", 4, NULL),
    ("Cecilia", "Priestley", 5, NULL),
    ("Helena", "Greathouse", 6, NULL),
    ("Wesley", "Prince", 7, 101),
    ("Priscilla", "Umbra", 8, NULL),
    ("Magdanalena", "Wilson", 9, 201),
    ("Adele", "BlackSmith", 10, 201),
    ("Elliott", "Smith", 11, 501),
    ("Antonia", "Lopez", 12, 501),
    ("Mark", "Banderas", 13, NULL),
    ("Will", "Kutcher", 14, 601);