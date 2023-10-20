const router = require('express').Router();

const { checkoutBook,  getAllCheckouts, getCheckoutById, getOverdueCheckouts } = require('../controllers/checkout');

// checkout a book
router.post('/', checkoutBook);

// get all checkouts
router.get('/', getAllCheckouts);

// get overdue checkouts
router.get('/overdue', getOverdueCheckouts);

// get checkout by id
router.get('/:id', getCheckoutById);


module.exports = router;