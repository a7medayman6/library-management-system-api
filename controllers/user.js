const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;



/**
 * Registers a new user.
 * @async
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @returns {Object} - The response object with a status code and a message.
 */
const registerUser = async (req, res) =>
{
    let user_data = {
        name: req.body.name,
        email: req.body.email
    };

    // validate input data
    if (!user_data.name || !user_data.email)
    {
        res.status(400).send({
            message: "User name and email are required."
        });
        return;
    }

    // validate the email 
    let email_regex = /\S+@\S+\.\S+/;
    if (!email_regex.test(user_data.email))
    {
        res.status(400).json({
            message: "Invalid email format."
        });
        return;
    }

    // validate the email is unique
    let user = await User.findOne({ where: { email: user_data.email } });
    if (user)
    {
        res.status(400).json({
            message: `User with email=${user_data.email} already exists.`
        });
        return;
    }

    // create a new user
    try
    {
        let result = await User.create(user_data);
        res.status(201).json( 
            { 
                message: "User created successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error creating a new User`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
        });
    }

};


/**
 * Retrieves all users from the database.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object with a message and data property.
 * @throws {Object} - Throws an error if there was an issue retrieving the users.
 */
const getAllUsers = async (req, res) =>
{
    try
    {
        let result = await User.findAll();
        res.status(200).json(
            {
                message: "Users retrieved successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving all Users`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Users."
        });
    }
};


/**
 * Updates a user's name and/or email by ID.
 * @async
 * @function updateUser
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {string} req.body.name - The new name of the user (optional).
 * @param {string} req.body.email - The new email of the user (optional).
 * @returns {Object} The updated user object and a success message.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 400 error if the email is invalid or already exists.
 * @throws {Object} A 500 error if there is an error updating the user.
 */
const updateUser = async (req, res) =>
{
    let user_id = req.params.id;

    // vaildate the user id exists
    let user = await User.findByPk(user_id);
    if (!user)
    {
        res.status(404).json({
            message: `User with id=${user_id} not found.`
        });
        return;
    }

    let input_data = {
        name: req.body.name,
        email: req.body.email
    };

    // validate the email if provided 
    if(input_data.email)
    {
        let email_regex = /\S+@\S+\.\S+/;
        if (!email_regex.test(input_data.email))
        {
            res.status(400).json({
                message: "Invalid email format."
            });
            return;
        }
        
        // validate the email is unique
        try
        {
            let user_with_same_email = await User.findOne({ where: { email: input_data.email } });
            if (user_with_same_email && user_with_same_email.id != user.id)
            {
                res.status(400).json({
                    message: `User with email=${input_data.email} already exists.`
                });
                return;
            }
        }
        catch (err)
        {
            Logger.error(filename, `Error validating eamil uniqueness with id=${user_id}`);
            Logger.error(filename, `Error: ${err.message}`);

            res.status(500).json({
                message: err.message || "Some error occurred while validating eamil uniqueness."
            });
        }
    }

    let user_data = {};
    if(input_data.name)
    {
        user_data.name = input_data.name;
    }
    if(input_data.email)
    {
        user_data.email = input_data.email;
    }

    // update the user
    try
    {
        let result = await User.update(user_data, { where: { id: user_id } });
        res.status(200).json(
            {
                message: "User updated successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error updating User with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while updating the User."
        });
    }
}


/**
 * Deletes a user by ID.
 * @async
 * @function deleteUser
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to delete.
 * @returns {Object} A success message and the number of users deleted.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 500 error if there is an error deleting the user.
 */
const deleteUser = async (req, res) =>
{
    let user_id = req.params.id;

    // check if user id is a number
    if(!user_id || isNaN(user_id))
    {
        res.status(400).send({
            message: "User ID is required and must be a number."
        });
        return;
    }
    
    // delete the user
    try
    {
        
            // vaildate the user id exists
            let user = await User.findByPk(user_id);
         
            if (!user)
            {
                res.status(404).json({
                    message: `User with id=${user_id} not found.`
                });
                return;
            }
        let result = await User.destroy({ where: { id: user_id } });
        res.status(200).json(
            {
                message: "User deleted successfully.",
                data: result
            });
    }
    catch (err)
    {
        Logger.error(filename, `Error deleting User with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while deleting the User."
        });
    }
}

/**
 * Retrieves a user by ID.
 * @async
 * @function getUserById
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} The user object.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 500 error if there is an error retrieving the user.
 */
const getUserById = async (req, res) =>
{
    let user_id = req.params.id;

    // check if user id is a number
    if(!user_id || isNaN(user_id))
    {
        res.status(400).send({
            message: "User ID is required and must be a number."
        });
        return;
    }

    // vaildate the user id exists
    try
    {
        let user = await User.findByPk(user_id);
        if (!user)
        {
            res.status(404).json({
                message: `User with id=${user_id} not found.`
            });
            return;
        }
        else
        {
            res.status(200).json(
                {
                    message: "User retrieved successfully.",
                    data: user
                });
        
        }
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving User with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the User."
        });
    };
}


/**
 * Retrieves a user's checkouts by ID.
 * @async
 * @function getUserCheckouts
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} The user's checkouts.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 500 error if there is an error retrieving the user's checkouts.
*/
const getUserCheckouts = async (req, res) =>
{
    let user_id = req.params.id;

    // check if user id is a number
    if(!user_id || isNaN(user_id))
    {
        res.status(400).send({
            message: "User ID is required and must be a number."
        });
        return;
    }

    // vaildate the user id exists
    try
    {
        let user = await User.findByPk(user_id);
        if (!user)
        {
            res.status(404).json({
                message: `User with id=${user_id} not found.`
            });
            return;
        }
        else
        {
            let result = await Checkout.findAll({ where: { user_id: user_id } });
            res.status(200).json(
                {
                    message: "User checkouts retrieved successfully.",
                    data: result
                });
        }
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving User checkouts with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the User checkouts."
        });
    };
}



/**
 * Retrieves the books a user borrowed and didn't return yet by ID.
 * @async
 * @function getUserBooks
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} The user's books.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 500 error if there is an error retrieving the user's books.
*/
const getUserBooks = async (req, res) =>
{
    let user_id = req.params.id;

    // check if user id is a number
    if(!user_id || isNaN(user_id))
    {
        res.status(400).send({
            message: "User ID is required and must be a number."
        });
        return;
    }
    // vaildate the user id exists
    try
    {
        let user = await User.findByPk(user_id);
        if (!user)
        {
            res.status(404).json({
                message: `User with id=${user_id} not found.`
            });
            return;
        }
        else
        {
            let result = await Checkout.findAll({ where: { user_id: user_id, returned: false } });
            res.status(200).json(
                {
                    message: "User books retrieved successfully.",
                    data: result
                });
        }
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving User books with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the User books."
        });
    };
}


/**
 * Retrieves the books a user borrowed and didn't return yet by ID.
 * @async
 * @function getUserOverdueBooks
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} The user's overdue books.
 * @throws {Object} A 404 error if the user with the given ID is not found.
 * @throws {Object} A 500 error if there is an error retrieving the user's overdue books.
*/
const getUserOverdueBooks = async (req, res) =>
{
    let user_id = req.params.id;

    // check if user id is a number
    if(!user_id || isNaN(user_id))
    {
        res.status(400).send({
            message: "User ID is required and must be a number."
        });
        return;
    }
    // vaildate the user id exists
    try
    {
        let user = await User.findByPk(user_id);
        if (!user)
        {
            res.status(404).json({
                message: `User with id=${user_id} not found.`
            });
            return;
        }
        
        let result = await Checkout.findAll({ where: { user_id: user_id, returned: false, return_date: { [db.Sequelize.Op.lt]: new Date() } } });
        res.status(200).json(
            {
                message: "User overdue books retrieved successfully.",
                data: result
            });
        
    }
    catch (err)
    {
        Logger.error(filename, `Error retrieving User overdue books with id=${user_id}`);
        Logger.error(filename, `Error: ${err.message}`);

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the User overdue books."
        });
    };
}

module.exports = { registerUser, getAllUsers, updateUser, deleteUser, getUserById, getUserCheckouts, getUserBooks, getUserOverdueBooks };