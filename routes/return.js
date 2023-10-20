const router = require('express').Router();
const { returnBookById, returnBook } = require('../controllers/return');

// return a book by checkout id
router.get('/:id', returnBookById);

// return a book by user_id and book_id
router.post('/', returnBook);

module.exports = router;