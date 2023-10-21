const router = require('express').Router();
const { returnBookById, returnBook } = require('../controllers/return');


/**
 * @openapi
 * /api/v1/return/{id}:
 *  get:
 *      summary: Return a book by checkout id
 *      description: Return a book by checkout id
 *      tags: [Return]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Checkout id
 *      responses:
 *          200:
 *              description: Book returned successfully
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id', returnBookById);


/**
 * @openapi
 * /api/v1/return:
 *  post:
 *      summary: Return a book by book id and user id
 *      description: Return a book by book id and user id
 *      tags: [Return]
 *      requestBody:
 *          description: Book id and user id
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: User's id
 *                              example: 2
 *                          book_id:
 *                              type: integer
 *                              description: Book's id
 *                              example: 1
 *      responses:
 *          200:
 *              description: Book returned successfully
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.post('/', returnBook);

module.exports = router;