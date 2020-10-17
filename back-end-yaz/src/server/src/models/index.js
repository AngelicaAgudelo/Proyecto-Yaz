
import Sequelize from 'sequelize';
import user from './user';
import item from './item';
import payment_item from './payment_item';
import payment_service from './payment_service';
import service from './service';

var pg = require('pg');
pg.defaults.ssl = true;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
        }
    },
);

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.user = user(sequelize, Sequelize);
models.item = item(sequelize, Sequelize);
models.payment_item = payment_item(sequelize, Sequelize);
models.payment_service = payment_service(sequelize, Sequelize);
models.service = service(sequelize, Sequelize);

module.exports = models;