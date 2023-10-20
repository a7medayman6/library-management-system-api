# Library Management System Backend using Nodejs

## Database Schema

### Books

| Field | Type | Description |
| --- | --- | --- |
| id | int | Unique identifier for the book |
| title | string | Title of the book |
| author | string | Author of the book |
| ISBN | string | ISBN of the book |
| quantity | int | Quantity of the book |
| shelf_location | string | Shelf location of the book |

### Users

| Field | Type | Description |
| --- | --- | --- |
| id | int | Unique identifier for the user |
| name | string | Name of the user |
| email | string | Email of the user |
| registration_date | date | Date and time of registration of the user |

### Borrowed Books

| Field | Type | Description |
| --- | --- | --- |
| id | int | Unique identifier for the borrowed book |
| book_id | int | Unique identifier for the book |
| user_id | int | Unique identifier for the user |
| borrowed_date | date | Date and time of borrowing of the book |
| return_date | date | Date and time the user has to return the book |
| returned_date | date | Date and time of returning of the book |
| createdAt | date | Date and time of creation of the borrowed book |
| updatedAt | date | Date and time of updation of the borrowed book |


## API Endpoints

### Books

- GET `/books` - Get all books
- GET `/books/:id` - Get a book by id
- POST `/books` - Create a new book
- PUT `/books/:id` - Update a book by id
- DELETE `/books/:id` - Delete a book by id
- DELETE `/books` - Delete all books
- GET `/books/search?title=bookTitle` - Search a book by title
- GET `/books/search?author=bookAuthor` - Search a book by author
- GET `/books/search?ISBN=bookISBN` - Search a book by ISBN

- POST `/books/checkout` - Checkout a book
- POST `/books/return` - Return a book
- GET `/books/overdue` - Get all overdue books
- GET `/books/borrowed` - Get all borrowed books


### Users

- GET `/users` - Get all users
- GET `/users/:id` - Get a user by id
- POST `/users` - Create a new user
- PUT `/users/:id` - Update a user by id
- DELETE `/users/:id` - Delete a user by id
- DELETE `/users` - Delete all users
- GET `/users/search?name=userName` - Search a user by name
- GET `/users/search?email=userEmail` - Search a user by email
- GET `/users/borrowed_books/:id` - Get all borrowed books of a user by id