const db = require('../models');
const Logger = require('../utils/logger');
const path = require('path');

const filename = path.basename(__filename);

const User = db.users;
const Book = db.books;
const Checkout = db.checkouts;


// export checkouts data in a period as csv file
const exportBorrowingData = async (req, res) =>
{
    const period_start = req.query.start || new Date(0).toISOString().split('T')[0].toString();
    const period_end = req.query.end || new Date().toISOString().split('T')[0].toString();

    // validate the period start and end are dates in the format of YYYY-MM-DD
    const date_regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!date_regex.test(period_start) || !date_regex.test(period_end))
    {
        res.status(400).send({
            message: "Start date and end date must be in the format of YYYY-MM-DD."
        });
        return;
    }
    
    if(period_start > period_end)
    {
        res.status(400).send({
            message: "Start date cannot be greater than end date."
        });
        return;
    }

    try
    {
        const checkouts = await Checkout.findAll({
            where: {
                checkout_date: {
                    [db.Sequelize.Op.between]: [period_start, period_end]
                }
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

        const number_of_checkouts = checkouts.length;
        
        const returns = checkouts.filter(checkout => checkout.returned_date != null);
        const number_of_returns = returns.length;

        const not_returned = checkouts.filter(checkout => checkout.returned_date == null);
        const number_of_not_returned = not_returned.length;

        const overdues = checkouts.filter(checkout => checkout.return_date < new Date()).filter(checkout => checkout.returned == false);
        const number_of_overdues = overdues.length;

        const users = checkouts.map(checkout => checkout.user_id).filter((value, index, self) => self.indexOf(value) === index);
        const number_of_users = users.length;

        const books = checkouts.map(checkout => checkout.book_id).filter((value, index, self) => self.indexOf(value) === index);
        const number_of_books = books.length;
        
        const csv = [];
        
        const fields = ['id', 'user id', 'book id', 'checkout date', 'return date', 'returned', 'returned date', 'overdue', 'user name', 'user email', 'book title', 'book author', 'book ISBN', 'period start', 'period end', 'no of borrowings', 'no of returns', 'no of not returned', 'no of overdues', 'no of users borrowed', 'no of books borrowed'];
        csv.push(fields.join(','));
        
        const stats_values = [period_start, period_end, number_of_checkouts, number_of_returns, number_of_not_returned, number_of_overdues, number_of_users, number_of_books];
        
        checkouts.forEach((checkout, index) =>
        {
            const values = [];
            values.push(checkout.id);
            values.push(checkout.user_id);
            values.push(checkout.book_id);
            values.push(checkout.checkout_date);
            values.push(checkout.return_date);
            values.push(checkout.returned ? 'yes' : 'no');
            values.push(checkout.returned_date ? checkout.returned_date : 'has not been returned yet');
            values.push(checkout.return_date < new Date() && checkout.returned == false ? 'yes' : 'no');
            values.push(checkout.User.name);
            values.push(checkout.User.email);
            values.push(checkout.Book.title);
            values.push(checkout.Book.author);
            values.push(checkout.Book.ISBN);
            if(index == 0)
            {
                values.push(period_start);
                values.push(period_end);
                values.push(number_of_checkouts);
                values.push(number_of_returns);
                values.push(number_of_not_returned);
                values.push(number_of_overdues);
                values.push(number_of_users);
                values.push(number_of_books);
            }

            csv.push(values.join(','));

        });


        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${period_start}-${period_end}-borrowing-data.csv`);
        res.status(200).send(csv.join('\r\n'));
    }
    catch (err)
    {
        Logger.error(filename, err.message);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkouts.'
        });
    }
}

const getBorrowingAnalytics = async (req, res) => 
{
    const period_start = req.query.start || new Date(0).toISOString().split('T')[0].toString();
    const period_end = req.query.end || new Date().toISOString().split('T')[0].toString();

    // validate the period start and end are dates in the format of YYYY-MM-DD
    const date_regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!date_regex.test(period_start) || !date_regex.test(period_end))
    {
        res.status(400).send({
            message: "Start date and end date must be in the format of YYYY-MM-DD."
        });
        return;
    }
    
    if(period_start > period_end)
    {
        res.status(400).send({
            message: "Start date cannot be greater than end date."
        });
        return;
    }

    try
    {
        const checkouts = await Checkout.findAll({
            where: {
                checkout_date: {
                    [db.Sequelize.Op.between]: [period_start, period_end]
                }
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

        const number_of_checkouts = checkouts.length;
        
        const returns = checkouts.filter(checkout => checkout.returned_date != null);
        const number_of_returns = returns.length;

        const not_returned = checkouts.filter(checkout => checkout.returned_date == null);
        const number_of_not_returned = not_returned.length;

        const overdues = checkouts.filter(checkout => checkout.return_date < new Date()).filter(checkout => checkout.returned == false);
        const number_of_overdues = overdues.length;

        const users = checkouts.map(checkout => checkout.user_id).filter((value, index, self) => self.indexOf(value) === index);
        const number_of_users = users.length;

        const books = checkouts.map(checkout => checkout.book_id).filter((value, index, self) => self.indexOf(value) === index);
        const number_of_books = books.length;


        res.status(200).json(
            { 
                message: 'Borrowing analytics retrieved successfully',

                data:
                {
                    period:
                    {
                        start: period_start,
                        end: period_end
                    },

                    no_of_borrowings: number_of_checkouts,
                    no_of_returns: number_of_returns,
                    no_of_not_returned: number_of_not_returned,
                    no_of_overdues: number_of_overdues,
                    no_of_users_borrowed: number_of_users,
                    no_of_books_borrowed: number_of_books,
                    
                    borrowings: checkouts,
                    returns: returns,
                    not_returned: not_returned,
                    overdues: overdues,
                    users_borrowed_books: users,
                    books_borrowed: books
                }
            });
    }
    catch (err)
    {
        Logger.error(filename, err.message);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkouts.'
        });
    }
}

const exportLastMonthOverdue = async (req, res) =>
{
    const period_start = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0].toString();
    const period_end = new Date().toISOString().split('T')[0].toString();

    try
    {
        const checkouts = await Checkout.findAll({
            where: {
                checkout_date: {
                    [db.Sequelize.Op.between]: [period_start, period_end]
                }
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

        const number_of_checkouts = checkouts.length;

        const overdues = checkouts.filter(checkout => checkout.return_date < new Date()).filter(checkout => checkout.returned == false);
        const number_of_overdues = overdues.length;

        const csv = [];

        
        const fields = ['id', 'user id', 'book id', 'checkout date', 'return date', 'returned', 'returned date', 'overdue', 'user name', 'user email', 'book title', 'book author', 'book ISBN'];
        csv.push(fields.join(','));
        

        overdues.forEach((checkout, index) =>
        {
            const values = [];
            values.push(checkout.id);
            values.push(checkout.user_id);
            values.push(checkout.book_id);
            values.push(checkout.checkout_date);
            values.push(checkout.return_date);
            values.push(checkout.returned ? 'yes' : 'no');
            values.push(checkout.returned_date ? checkout.returned_date : 'has not been returned yet');
            values.push(checkout.return_date < new Date() && checkout.returned == false ? 'yes' : 'no');
            values.push(checkout.User.name);
            values.push(checkout.User.email);
            values.push(checkout.Book.title);
            values.push(checkout.Book.author);
            values.push(checkout.Book.ISBN);


            csv.push(values.join(','));
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${period_start}-${period_end}-borrowing-data.csv`);
        res.status(200).send(csv.join('\r\n'));
    }
    catch (err)
    {
        Logger.error(filename, err.message);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkouts.'
        });
    }
}


const exportLastMonthBorrowings = async (req, res) =>
{
    const period_start = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0].toString();
    const period_end = new Date().toISOString().split('T')[0].toString();

    try
    {
        const checkouts = await Checkout.findAll({
            where: {
                checkout_date: {
                    [db.Sequelize.Op.between]: [period_start, period_end]
                }
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

        const number_of_checkouts = checkouts.length;

        const csv = [];
        
        
        const fields = ['id', 'user id', 'book id', 'checkout date', 'return date', 'returned', 'returned date', 'overdue', 'user name', 'user email', 'book title', 'book author', 'book ISBN'];
        csv.push(fields.join(','));
    
        checkouts.forEach((checkout, index) =>
        {
            const values = [];
            values.push(checkout.id);
            values.push(checkout.user_id);
            values.push(checkout.book_id);
            values.push(checkout.checkout_date);
            values.push(checkout.return_date);
            values.push(checkout.returned ? 'yes' : 'no');
            values.push(checkout.returned_date ? checkout.returned_date : 'has not been returned yet');
            values.push(checkout.return_date < new Date() && checkout.returned == false ? 'yes' : 'no');
            values.push(checkout.User.name);
            values.push(checkout.User.email);
            values.push(checkout.Book.title);
            values.push(checkout.Book.author);
            values.push(checkout.Book.ISBN);


            csv.push(values.join(','));
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${period_start}-${period_end}-borrowing-data.csv`);
        res.status(200).send(csv.join('\r\n'));
    }
    catch (err)
    {
        Logger.error(filename, err.message);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving checkouts.'
        });
    }
}
module.exports = { getBorrowingAnalytics, exportBorrowingData, exportLastMonthOverdue, exportLastMonthBorrowings };