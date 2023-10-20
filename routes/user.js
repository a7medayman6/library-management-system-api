const router = require('express').Router();
const { registerUser, getAllUsers, updateUser, deleteUser, getUserById, getUserCheckouts } = require('../controllers/user');

// register a new user
router.post('/', registerUser);

// get all users
router.get('/', getAllUsers);

// update a user
router.patch('/:id', updateUser);

// delete a user
router.delete('/:id', deleteUser);

// get user by id
router.get('/:id', getUserById);

// get user checkouts by user id
router.get('/:id/checkouts', getUserCheckouts);
// generate example http request 


module.exports = router;
