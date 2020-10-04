import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
);

const models = {
    User: require('./user'),
    Item: require('./item'),
    Payment_Item: require('./payment_item'),
    Service: require('./service'),
    Payment_Service: require('./payment_service')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;