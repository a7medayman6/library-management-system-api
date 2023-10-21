const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;


/**
 * Creates a new book.
 * @async
 * @function createBook
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.title - The title of the book.
 * @param {string} req.body.author - The author of the book.
 * @param {string} req.body.ISBN - The ISBN of the book.
 * @param {number} req.body.available_copies - The number of available copies of the book.
 * @returns {Object} The response object with a message and data property.
 * @throws {Object} The response object with a message property if an error occurs.
 */
const createBook = async (req, res) =>
{
    let input_data = {
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        available_copies: req.body.available_copies
    };

    if(!input_data.title || !input_data.author || !input_data.ISBN)
    {
        res.status(400).send({
            message: "Book title, author and ISBN are required."
        });
        return;
    }

    // validate the ISBN is unique
    let book_with_same_ISBN = await Book.findOne({ where: { ISBN: input_data.ISBN } });
    if(book_with_same_ISBN)
    {
        res.status(400).json({
            message: `Book with ISBN=${input_data.ISBN} already exists, ISBN must be unique.`
        });
        return;
    }

    // create a new book
    try
    {
        let result = await Book.create(input_data);
        res.status(201).json( 
            { 
                message: "Book created successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error creating a new Book`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error creating a new Book"
        });
    }
}

/**
 * Retrieves all books from the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing a message and data.
 */
const getAllBooks = async (req, res) =>
{
    try
    {
        let result = await Book.findAll();
        res.status(200).json({
            message: "Users retrieved successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving all Books`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: "Error retrieving all Books"
        });
    }
}   



/**
 * Retrieves a book by its ID.
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {number} req.params.id - The ID of the book to retrieve.
 * @returns {Object} - The HTTP response object with a JSON payload containing the book data or an error message.
 */
const getBookById = async (req, res) =>
{
    let id = req.params.id;
    // check if id is a number
    if(isNaN(id))
    {
        res.status(400).json({
            message: "Book id must be a number."
        });
        return;
    }

    try
    {
        let result = await Book.findByPk(id);

        if(!result)
        {
            res.status(404).json({
                message: `Book with id=${id} does not exist.`
            });
            return;
        }
        
        res.status(200).json({
            message: "Book retrieved successfully.",
            data: result
        });
        

    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving Book with id=${id}`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error retrieving Book with id=${id}`
        });
    }
}


/**
 * Updates a book with the given id in the database.
 * @async
 * @function updateBook
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} [req.body.title] - The title of the book.
 * @param {string} [req.body.author] - The author of the book.
 * @param {string} [req.body.ISBN] - The ISBN of the book.
 * @param {number} [req.body.available_copies] - The number of available copies of the book.
 * @returns {Promise<void>} - A Promise that resolves when the book is updated.
 */
const updateBook = async (req, res) =>
{
    let id = req.params.id;
    let input_data = {
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        available_copies: req.body.available_copies
    };

    // check if id is a number
    if(isNaN(id))
    {
        res.status(400).json({
            message: "Book id must be a number."
        });
        return;
    }

    // validate the book id exists
    let book = await Book.findByPk(id);
    if(!book)
    {
        res.status(404).json({
            message: `Book with id=${id} not found.`
        });
        return;
    }

    // validate the ISBN is unique
    if(input_data.ISBN)
    {
        let book_with_same_ISBN = await Book.findOne({ where: { ISBN: input_data.ISBN } });
        if(book_with_same_ISBN && book_with_same_ISBN.id != book.id)
        {
            res.status(400).json({
                message: `Book with ISBN=${input_data.ISBN} already exists, ISBN must be unique.`
            });
            return;
        }
    }

    const book_updates = {}
    if(input_data.title) book_updates.title = input_data.title;
    if(input_data.author) book_updates.author = input_data.author;
    if(input_data.ISBN) book_updates.ISBN = input_data.ISBN;
    if(input_data.available_copies) book_updates.available_copies = input_data.available_copies;

    try
    {
        let result = await Book.update(book_updates, { where: { id: id } });
        res.status(200).json({
            message: "Book updated successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error updating Book with id=${id}`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error updating Book with id=${id}`
        });
    }
}


/**
 * Deletes a book with the specified ID.
 * @async
 * @function deleteBook
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {number} req.params.id - The ID of the book to delete.
 * @returns {Object} The response object.
 */
const deleteBook = async (req, res) =>
{
    let id = req.params.id;

    // check if id is a number
    if(isNaN(id))
    {
        res.status(400).json({
            message: "Book id must be a number."
        });
        return;
    }

    // validate the book id exists
    let book = await Book.findByPk(id);
    if(!book)
    {
        res.status(404).json({
            message: `Book with id=${id} not found.`
        });
        return;
    }

    try
    {
        let result = await Book.destroy({ where: { id: id } });
        res.status(200).json({
            message: "Book deleted successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error deleting Book with id=${id}`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error deleting Book with id=${id}`
        });
    }
}

/**
 * Deletes all books from the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a message and data property.
 * @throws {Object} The response object with a message property if an error occurs.
 */
const deleteAllBooks = async (req, res) =>
{
    try
    {
        let result = await Book.destroy({ where: {} });
        res.status(200).json({
            message: "All Books deleted successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error deleting all Books`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error deleting all Books`
        });
    }
}


/**
 * Retrieves all checkouts for a book with the given id.
 * @async
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {number} req.params.id - The ID of the book to retrieve checkouts for.
 * @returns {Promise<void>} - A Promise that resolves when the checkouts are retrieved successfully.
 */
const getBookCheckouts = async (req, res) =>
{
    let id = req.params.id;

    // check if id is a number
    if(isNaN(id))
    {
        res.status(400).json({
            message: "Book id must be a number."
        });
        return;
    }

    // validate the book id exists
    let book = await Book.findByPk(id);
    if(!book)
    {
        res.status(404).json({
            message: `Book with id=${id} not found.`
        });
        return;
    }

    try
    {
        let result = await Checkout.findAll({ where: { book_id: id } });
    
        res.status(200).json({
            message: "Checkouts retrieved successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving Checkouts for Book with id=${id}`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error retrieving Checkouts for Book with id=${id}`
        });
    }
}

/**
 * Searches for books by title, author or ISBN using query parameters.
 * At least one query parameter is required.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} [req.query.title] - The title of the book to search for.
 * @param {string} [req.query.author] - The author of the book to search for.
 * @param {string} [req.query.ISBN] - The ISBN of the book to search for.
 * @returns {Promise<void>} - A Promise that resolves with the search results.
 */
const searchBooks = async (req, res) =>
{
    let title_query = req.query.title;
    let author_query = req.query.author;
    let ISBN_query = req.query.ISBN;

    // validate at least one query parameter is provided
    if(!title_query && !author_query && !ISBN_query)
    {
        res.status(400).json({
            message: "At least one query parameter is required."
        });
        return;
    }

    // search for books by title, author or ISBN using OP.like operator
    let search_query = {};
    if(title_query) search_query.title = { [db.Sequelize.Op.like]: '%' + `${title_query}` + `%` };
    if(author_query) search_query.author = { [db.Sequelize.Op.like]: '%' + `${author_query}` + `%` };
    if(ISBN_query) search_query.ISBN = { [db.Sequelize.Op.like]: '%' + `${ISBN_query}` + `%` };

    try
    {
        let result = await Book.findAll({ where: search_query });
        res.status(200).json({
            message: "Books retrieved successfully.",
            data: result
        });
    }
    catch (err)
    {
        Logger.error(filename, `Error searching for Books`);
        Logger.error(filename, `Error: ${err.message}`);
        res.status(500).json({
            message: `Error searching for Books`
        });
    }
    
}

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook, deleteAllBooks, getBookCheckouts, searchBooks };
