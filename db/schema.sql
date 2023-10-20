CREATE DATABASE IF NOT EXISTS `lib-management-system-db`;

USE `lib-management-system-db`;


CREATE TABLE IF NOT EXISTS Book (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(50) NOT NULL, 
    author VARCHAR(50) NOT NULL, 
    isbn VARCHAR(50) NOT NULL, 
    quantity INT DEFAULT 0, 
    shelf_location INT DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) DEFAULT NULL,
    registered_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS Checkout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    checkout_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    return_date DATE DEFAULT NULL,
    returned_date DATE DEFAULT NULL,
    returned TINYINT(1) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (book_id) REFERENCES Book(id)
);
