const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => 
{
    class Book extends Model { }
 
    Book.init(
    {
        id: 
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // number of digits in ISBN is 10 in ISBN-10 (older books) and 13 in ISBN-13
            validate: 
            {
                len: [10, 13]
            }
        },
        available_copies: 
        {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        registeration_date: 
        {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW
        },

    }, 
    {
        sequelize,  
        modelName: 'Book',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        // add indexes to the table
        indexes: 
        [
            {
                using: 'BTREE',
                fields: ['title']
            },
            {
                using: 'BTREE',
                fields: ['author']
            }

        ] 
    });

    // Book.Checkout = Book.hasMany(sequelize.models.Checkout,
    // {
    //     as: 'Checkout',
    //     foreignKey: 'book_id',
    //     onDelete: 'CASCADE',
    // });

    

    return Book;
}