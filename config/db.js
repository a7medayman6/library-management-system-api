module.exports = 
{
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DB: process.env.DB_NAME || 'library-management-system-db',
    dialect: process.env.DB_DIALECT || 'mysql',
    // port
    PORT: process.env.DB_PORT || 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};