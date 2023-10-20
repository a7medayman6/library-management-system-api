const { Sequelize, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => 
{
    class User extends Model { }

    User.init(
    {
        id: 
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: 
        {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        registeration_date: 
        {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

    }, 
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });

    return User;
}