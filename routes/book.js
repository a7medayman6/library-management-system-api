const { createBook, getAllBooks, getBookById, updateBook, deleteBook, deleteAllBooks, getBookCheckouts, searchBooks } = require('../controllers/book');

const router = require('express').Router();

/**
 * @openapi
 * /api/v1/books:
 *  post:
 *      summary: Create a new book
 *      description: Create a new book
 *      tags: [Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Book's title
 *                              example: The Alchemist
 *                          author:
 *                              type: string
 *                              description: Book's author
 *                              example: Paulo Coelho
 *                          ISBN:
 *                              type: string
 *                              description: Book's ISBN (10 digits for ISBN-10 (old books) or 13 digits for ISBN-13)
 *                              example: 9780061122415
 *                          available_copies:
 *                              type: integer
 *                              description: Book's available copies
 *                              example: 1
 *      responses:
 *          201:
 *              description: Book created successfully
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.post('/', createBook);

/**
 * @openapi
 * /api/v1/books:
 *  get:
 *      summary: Retrieve all books
 *      description: Retrieve all books
 *      tags: [Book]
 *      responses:
 *          200:
 *              description: Books retrieved successfully
 *          500:
 *              description: Internal Server Error
 */
router.get('/', getAllBooks);

/**
 * @openapi
 * /api/v1/books/search:
 *  get:
 *      summary: Search for books by title, author, or ISBN (or any combination of them)
 *      description: Search for books by title, author, or ISBN (or any combination of them) using query parameters
 *      tags: [Book]
 *      parameters:
 *          - in: query
 *            name: title
 *            schema:
 *              type: string
 *            description: Book's title
 *            example: The Alchemist
 *          - in: query
 *            name: author
 *            schema:
 *              type: string
 *            description: Book's author
 *            example: Paulo Coelho
 *          - in: query
 *            name: ISBN
 *            schema:
 *              type: string
 *            description: Book's ISBN (10 digits for ISBN-10 (old books) or 13 digits for ISBN-13)
 *            example: 9780061122415
 *      responses:
 *          200:
 *              description: Books retrieved successfully
 *          500:
 *              description: Internal Server Error
 */
router.get('/search', searchBooks);



/**
 * @openapi
 * /api/v1/books/{id}:
 *  get:
 *      summary: Retrieve a book by id
 *      description: Retrieve a book by id
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Book's id
 *            example: 2
 *      responses:
 *          200:
 *              description: Book retrieved successfully
 *          404:
 *              description: Book not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id', getBookById);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   patch:
 *      summary: Update a book by id
 *      description: Update a book by id, only the provided fields will be updated
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Book's id
 *            example: 2
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Book's title
 *                              example: The Alchemist
 *                          author:
 *                              type: string
 *                              description: Book's author
 *                              example: Paulo Coelho
 *                          ISBN:
 *                              type: string
 *                              description: Book's ISBN (10 digits for ISBN-10 (old books) or 13 digits for ISBN-13)
 *                              example: 9780061122415
 *                          available_copies:
 *                              type: integer
 *                              description: Book's available copies
 *                              example: 5
 *      responses:
 *          200:
 *              description: Book updated successfully
 *          404:
 *              description: Book not found
 *          500:
 *              description: Internal Server Error
 */
router.patch('/:id', updateBook);


/**
 * @openapi
 * /api/v1/books/{id}:
 *  delete:
 *      summary: Delete a book by id
 *      description: Delete a book by id
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Book's id
 *            example: 2
 *      responses:
 *          200:
 *              description: Book deleted successfully
 *          404:
 *              description: Book not found
 *          500:
 *              description: Internal Server Error
 */
router.delete('/:id', deleteBook);


/**
 * @openapi
 * /api/v1/books:
 *  delete:
 *      summary: Delete all books
 *      description: Delete all books
 *      tags: [Book]
 *      responses:
 *          200:
 *              description: Books deleted successfully
 *          500:
 *              description: Internal Server Error
 */
router.delete('/', deleteAllBooks);

// generate openapi docs for get book checkouts for use with swagger jsdoc, tag it with Book.
/**
 * @openapi
 * /api/v1/books/{id}/checkouts:
 *  get:
 *      summary: Retrieve all checkouts for a book by id
 *      description: Retrieve all checkouts for a book by id
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Book's id
 *            example: 1
 *      responses:
 *          200:
 *              description: Checkouts retrieved successfully
 *          404:
 *              description: Book not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id/checkouts', getBookCheckouts);


module.exports = router;