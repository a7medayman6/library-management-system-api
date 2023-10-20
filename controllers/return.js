const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;




// return a book by checkout id
const returnBookById = async (req, res) =>
{
    let checkout_id = req.params.id;

    if(!checkout_id)
    {
        res.status(400).send({
            message: "Checkout ID is required."
        });
        return;
    }

    // validate the checkout exists
    let checkout = await Checkout.findOne({ where: { id: checkout_id } });
    if(!checkout)
    {
        res.status(400).json({
            message: `Checkout with ID=${checkout_id} does not exist.`
        });
        return;
    }

    // return the book
    try
    {
        checkout.returned = true;
        checkout.returned_date = new Date();
        await checkout.save();

        // update the book available copies
        let book = await Book.findOne({ where: { id: checkout.book_id } });
        book.available_copies++;
        await book.save();

        res.status(200).json( 
            { 
                message: "Book returned successfully.",
                data: checkout
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error returning Book`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error returning Book"
        });
    }
};

// return a book
const returnBook = async (req, res) =>
{
    let user_id = req.body.user_id;
    let book_id = req.body.book_id;

    if(!user_id || !book_id)
    {
        res.status(400).send({
            message: "User ID and Book ID are required."
        });
        return;
    }

    // validate the user exists
    let user = await User.findOne({ where: { id: user_id } });
    if(!user)
    {
        res.status(400).json({
            message: `User with ID=${user_id} does not exist.`
        });
        return;
    }

    // validate the book exists
    let book = await Book.findOne({ where: { id: book_id } });
    if(!book)
    {
        res.status(400).json({
            message: `Book with ID=${book_id} does not exist.`
        });
        return;
    }

    // validate the user has checked out the book
    let checkout = await Checkout.findOne({ where: { user_id: user_id, book_id: book_id, returned: false } });
    if(!checkout)
    {
        res.status(400).json({
            message: `User with ID=${user_id} has not checked out Book with ID=${book_id}.`
        });
        return;
    }

    // return the book
    try
    {
        checkout.returned = true;
        checkout.returned_date = new Date();
        await checkout.save();

        // update the book available copies
        book.available_copies++;
        await book.save();

        res.status(200).json( 
            { 
                message: "Book returned successfully.",
                data: checkout
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error returning Book`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error returning Book"
        });
    }
};

module.exports = { returnBookById, returnBook };