const router = require('express').Router();

const { checkoutBook,  getAllCheckouts, getCheckoutById, getOverdueCheckouts } = require('../controllers/checkout');


/**
 * @openapi
 * /api/v1/checkout:
 *  post:
 *      summary: Checkout a book
 *      description: Checkout a book
 *      tags: [Checkout]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          book_id:
 *                              type: string
 *                              description: Book's id
 *                              example: 3
 *                          user_id:
 *                              type: string
 *                              description: User's id
 *                              example: 4
 *      responses:
 *          201:
 *              description: Book checked out successfully
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.post('/', checkoutBook);

/**
 * @openapi
 * /api/v1/checkout:
 *  get:
 *      summary: Retrieve all checkouts
 *      description: Retrieve all checkouts
 *      tags: [Checkout]
 *      responses:
 *          200:
 *              description: Checkouts retrieved successfully
 *          500:
 *              description: Internal Server Error
 */
router.get('/', getAllCheckouts);


/**
 * @openapi
 * /api/v1/checkout/overdue:
 *  get:
 *      summary: Retrieve all overdue checkouts (All the borrowed books that are not returned yet)
 *      description: Retrieve all overdue checkouts (All the borrowed books that are not returned yet)
 *      tags: [Checkout]
 *      responses:
 *          200:
 *              description: Overdue checkouts retrieved successfully
 *          500:
 *              description: Internal Server Error
 */
router.get('/overdue', getOverdueCheckouts);


/**
 * @openapi
 * /api/v1/checkout/{id}:
 *  get:
 *      summary: Retrieve a checkout by id
 *      description: Retrieve a checkout by id
 *      tags: [Checkout]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Checkout's id
 *            example: 1
 *      responses:
 *          200:
 *              description: Checkout retrieved successfully
 *          404:
 *              description: Checkout not found
 *          500:
 *              description: Internal Server Error
 */
router.get('/:id', getCheckoutById);


module.exports = router;