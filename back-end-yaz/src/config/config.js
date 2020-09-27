module.exports = {
    development: {
        database: process.env.DATABASE,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
};