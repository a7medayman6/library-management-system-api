const Logger = require('../utils/logger');
const db_config = require("../config/db.js");
const path = require('path');

const { Sequelize, DataTypes } = require("sequelize");

const filename = path.basename(__filename);

const sequelize = new Sequelize(
    db_config.DB,
    db_config.USER,
    db_config.PASSWORD,
    {
        host: db_config.HOST,
        dialect: db_config.dialect,
        operatorsAliases: false,
        pool: 
        {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle
        }
    }
);

sequelize.authenticate()
.then(() =>
{
    Logger.log(filename, `Connection to ${db_config.DB} database at ${db_config.HOST} has been established successfully.`);
})
.catch(err =>
{
    Logger.error(filename, `Unable to connect to the database`);
    Logger.error(filename, `${err}`);
});


var db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, DataTypes);
db.users = require("./user.model.js")(sequelize, DataTypes);
db.checkouts = require("./checkout.model.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() =>
{
    Logger.log(filename, "Dropped and re-synced db, if any.");
})

module.exports = db;