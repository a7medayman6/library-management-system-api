const router = require('express').Router();
const { registerUser, getAllUsers, updateUser, deleteUser, getUserById, getUserCheckouts, getUserBooks, getUserOverdueBooks } = require('../controllers/user');

/**
 * @openapi
 * /api/v1/users:
 *  post:
 *      summary: Register a new user
 *      description: Register a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: User's name
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              description: User's email
 *                              example: john@gmail.com
 *      responses:
 *          201:
 *              description: User created successfully
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 */
router.post('/', registerUser);


/**
 * @openapi
 * /api/v1/users:
 *  get:
 *      summary: Get all users
 *      description: Get all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Message
 *                                  example: Users retrieved successfully
 *                              data:
 *                                  type: array
 *                                  description: List of users
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              description: User's id
 *                                              example: 1
 *                                          name:
 *                                              type: string
 *                                              description: User's name
 *                                              example: John Doe
 *                                          email:
 *                                              type: string
 *                                              description: User's email
 *                                              example: john@gmail.com
 *                                          registeration_date:
 *                                              type: string
 *                                              description: User's regstration date
 *                                              example: 2021-01-01T00:00:00.000Z
 *                                          createdAt:
 *                                              type: string
 *                                              description: Auto generated timestamp for creation date
 *                                              example: 2021-01-01T00:00:00.000Z
 *                                          updatedAt:
 *                                              type: string
 *                                              description: Auto generated timestamp for update date
 *                                              example: 2021-01-01T00:00:00.000Z
 *          400:
 *             description: Bad request
 *          500:
 *             description: Internal Server Error
 * 
 */
router.get('/', getAllUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *  patch:
 *      summary: Update a user
 *      description: Update a user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: User's name
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              description: User's email
 *                              example: john@gmail.com
 *      responses:
 *          200:
 *              description: User updated successfully
 *          400:
 *              description: Bad request
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal Server Error
 */
router.patch('/:id', updateUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *  delete:
 *      summary: Delete a user
 *      description: Delete a user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      responses:
 *          204:
 *              description: User deleted successfully
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal Server Error
*/
router.delete('/:id', deleteUser);


/**
 * @openapi
 * /api/v1/users/{id}:
 *  get:
 *      summary: Get a user by id
 *      description: Get a user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      responses:
 *          200:
 *              description: OK, returns a user
 *          404:
 *              description: User not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 * 
 */
router.get('/:id', getUserById);

/**
 * @openapi
 * /api/v1/users/{id}/checkouts:
 *  get:
 *      summary: Get all checkouts for a user
 *      description: Get all checkouts for a user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      responses:
 *          200:
 *              description: OK, returns a list of checkouts
 *          404:
 *              description: User not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 * 
 */
router.get('/:id/checkouts', getUserCheckouts);


/**
 * @openapi
 * /api/v1/users/{id}/overdue:
 *  get:
 *      summary: Get all overdue books for a user
 *      description: Get all overdue books for a user
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      responses:
 *          200:
 *              description: OK, returns a list of overdue books
 *          404:
 *              description: User not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 * 
 */
router.get('/:id/overdue', getUserOverdueBooks);

// generate openai docs for the route below for use with swagger jsdoc
/**
 * @openapi
 * /api/v1/users/{id}/books:
 *  get:
 *      summary: Get all books that a user has borrowed and didn't return yet
 *      description: Get all books that a user didn't return yet
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: User's id
 *      responses:
 *          200:
 *              description: OK, returns a list of books
 *          404:
 *              description: User not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal Server Error
 * 
 */
router.get('/:id/books', getUserBooks);

module.exports = router;
