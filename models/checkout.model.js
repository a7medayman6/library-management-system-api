const { Sequelize, Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => 
{
    class Checkout extends Model { }

    Checkout.init(
    {
        id: 
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 
            {
                model: 'Users',
                key: 'id',
                onDelete: 'CASCADE'
            }
        },
        book_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 
            {
                model: 'Books',
                key: 'id',
                onDelete: 'CASCADE'

            }
        },
        checkout_date: 
        {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        return_date: 
        {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        returned_date: 
        {
            type: DataTypes.DATEONLY,
            defaultValue: null
        },
        returned:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    }, 
    {
        sequelize, 
        
        modelName: 'Checkout',

        timestamps: true,

        createdAt: true,

        updatedAt: true,
    });

    Checkout.User = Checkout.belongsTo(sequelize.models.User, { as: 'User', foreignKey: 'user_id' });
    Checkout.Book = Checkout.belongsTo(sequelize.models.Book, { as: 'Book', foreignKey: 'book_id' });
    return Checkout;
}