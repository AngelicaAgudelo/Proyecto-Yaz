require('dotenv').config();

module.exports = {
    development: {
        database: 'Yaz',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        dialect: 'postgres'
    },
    heroku: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
};