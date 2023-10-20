const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;

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

// get all users
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

// update a user by id 
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

// delete a user by id
const deleteUser = async (req, res) =>
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

    // delete the user
    try
    {
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

// get user by id
const getUserById = async (req, res) =>
{
    let user_id = req.params.id;

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

// get user checkouts by user id
const getUserCheckouts = async (req, res) =>
{
    let user_id = req.params.id;

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

// get user books
const getUserBooks = async (req, res) =>
{
    let user_id = req.params.id;

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

// get user overdue books
const getUserOverdueBooks = async (req, res) =>
{
    let user_id = req.params.id;

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
        
        let result = await Checkout.findAll({ where: { user_id: user_id, returned: false, due_date: { [Op.lt]: new Date() } } });
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