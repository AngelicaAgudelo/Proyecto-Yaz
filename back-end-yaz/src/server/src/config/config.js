require('dotenv').config();

module.exports = {
    development: {
        database: 'postgres',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        dialect: 'postgres'
    }
};