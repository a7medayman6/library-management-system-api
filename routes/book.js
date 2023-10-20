const { createBook, getAllBooks, getBookById, updateBook, deleteBook, deleteAllBooks, getBookCheckouts, searchBooks } = require('../controllers/book');

const router = require('express').Router();

// Create a new Book
router.post('/', createBook);

// Retrieve all Books
router.get('/', getAllBooks);

// Search for a book by query string
router.get('/search', searchBooks);

// Retrieve a single Book with id
router.get('/:id', getBookById);

// Update a Book with id
router.patch('/:id', updateBook);

// Delete a Book with id
router.delete('/:id', deleteBook);

// Delete all Books
router.delete('/', deleteAllBooks);

// Retrieve all Checkouts for a Book with id
router.get('/:id/checkouts', getBookCheckouts);


module.exports = router;