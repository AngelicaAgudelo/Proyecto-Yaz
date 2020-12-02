
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
models.service = service(sequelize, Sequelize);
models.payment_item = payment_item(sequelize, Sequelize);
models.payment_service = payment_service(sequelize, Sequelize);

// payment_item/item and payment_item/user
models.item.hasMany(models.payment_item,
    {
        as: 'item_payment_item',
        foreignKey: 'id_item',
        targetKey: 'id_payment_item'
    }
)

models.payment_item.belongsTo(models.item);

models.user.hasMany(models.payment_item,
    {
        as: 'user_payment_item',
        foreignKey: 'id_user',
        targetKey: 'id_payment_item'
    }
);

models.payment_item.belongsTo(models.user);

// service/client
models.user.belongsToMany(models.service,
    {
        through: 'user_service',
        sourceKey: 'user_name',
        targetKey: 'client_name',
    }
);

models.service.belongsToMany(models.user, { through: 'user_service' });


// service/worker
models.user.belongsToMany(models.service,
    {
        through: 'worker_service',
        sourceKey: 'user_name',
        targetKey: 'worker_name',
    }
);

models.service.belongsToMany(models.user, { through: 'worker_service' });

// service/payment_service 
models.service.hasOne(models.payment_service,
    {
        as: 'service_payment_service',
        foreignKey: 'id_service',
        targetKey: 'id_payment_service'
    }
);

models.payment_service.belongsTo(models.service);

module.exports = models;