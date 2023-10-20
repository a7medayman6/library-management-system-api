# Library Management System

Objective: Design and implement a simple library management system to manage books and borrowers.

## Functional Requirements

1- Books:

- [x] Add a book with details like title, author, ISBN, available quantity, and shelf location.
- [x] Update a book’s details.
- [x] Delete a book.
- [x] List all books.
- [x] Search for a book by title, author, or ISBN.

2- Borrowers:
- [x] Register a borrower with details like name, email, and registered date (Keep the user details as simple as possible).
- [x] Update borrower’s details.
- [x] Delete a borrower.
- [x] List all borrowers.

3- Borrowing Process:
- [x] A borrower can check out a book. The system should keep track of which books are checked out and by whom.
- [x] A borrower can return a book.
- [x] A borrower can check the books they currently have.
- [x] The system should keep track of due dates for the books and list books that are overdue.

## Non-functional Requirements

1. Performance: The system should be optimized for reading operations since searching and listing books/borrowers will be frequent operations.
2. Scalability: The system design should support the addition of new features in the future, like reservations or reviews.
3. Security: Ensure that user inputs are validated to prevent SQL injection or other potential security threats.


## Bonus - Ordered descending by value (Optional)
1. The system can show analytical reports of the borrowing process in a specific period and
export the borrowing process data in CSV or Xlsx sheet formats e.x.
2. Exports all overdue borrows of the last month.
3. Exports all borrowing processes of the last month.
4. Implement rate limiting for the API to prevent abuse. (Choose only two endpoints to apply the rate-limiting).
5. Dockerizing the application using docker-compose.
6. Implement basic authentication for the API.
7. Add unit tests (Adding unit tests for only one module shall be enough, choose the easiest one).