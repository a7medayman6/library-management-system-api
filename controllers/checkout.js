const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;


const checkoutBook = async (req, res) =>
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

    
    // validate the user has not checked out the book already
    let checkout = await Checkout.findOne({ where: { user_id: user_id, book_id: book_id, returned: false } });
    if(checkout)
    {
        res.status(400).json({
            message: `User with ID=${user_id} has already checked out Book with ID=${book_id} and haven't returned it yet.`
        });
        return;
    }

    // validate the book has available copies
    if(book.available_copies <= 0)
    {
        res.status(400).json({
            message: `Book with ID=${book_id} does not have available copies.`
        });
        return;
    }
    
    // checkout the book
    try
    {
        let result = await Checkout.create({ user_id: user_id, book_id: book_id, return_date: new Date(new Date().setDate(new Date().getDate() + 7)) });
        // update the book available copies
        book.available_copies--;
        await book.save();

        res.status(201).json( 
            { 
                message: "Book checked out successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error checking out Book`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error checking out Book"
        });
    }
};

// list all checkouts
const getAllCheckouts = async (req, res) =>
{
    try
    {
        let result = await Checkout.findAll({
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Book,
                    as: 'Book',
                    attributes: ['id', 'title', 'author', 'ISBN']
                }
            ]
        });
        res.status(200).json(
            {
                message: "Checkouts retrieved successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving Checkouts`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error retrieving Checkouts"
        });
    }
};

// get checkout by id
const getCheckoutById = async (req, res) =>
{
    let checkout_id = req.params.id;

    if(!checkout_id || isNaN(checkout_id))
    {
        res.status(400).send({
            message: "Checkout ID is required and must be a number."
        });
        return;
    }

    try
    {
        let result = await Checkout.findOne({ 
            where: { id: checkout_id },
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Book,
                    as: 'Book',
                    attributes: ['id', 'title', 'author', 'ISBN']
                }
            ] });
        if(!result)
        {
            res.status(404).json({
                message: `Checkout with ID=${checkout_id} does not exist.`
            });
            return;
        }
        res.status(200).json(
            {
                message: "Checkout retrieved successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving Checkout`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error retrieving Checkout"
        });
    }
}

// get overdue checkouts
const getOverdueCheckouts = async (req, res) =>
{
    try
    {
        let result = await Checkout.findAll({ 
            where: 
            { 
                return_date: { [db.Sequelize.Op.lt]: new Date() }, 
                returned: false 
            },
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Book,
                    as: 'Book',
                    attributes: ['id', 'title', 'author', 'ISBN']
                }
            ]
        });
        res.status(200).json(
            {
                message: "Overdue Checkouts retrieved successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving Overdue Checkouts`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error retrieving Overdue Checkouts"
        });
    }
}


module.exports = { checkoutBook, getAllCheckouts, getCheckoutById, getOverdueCheckouts };
