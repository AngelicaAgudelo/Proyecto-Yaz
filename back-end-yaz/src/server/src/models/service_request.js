const service_request = (sequelize, DataTypes) => {
    const service_request = sequelize.define('service_request', {
        id_service_request: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_date_start: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_date_end: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_description: {
            type: DataTypes.STRING,
        },
    });

    service_request.sync({ logging: true });
    return service_request;
};

export default service_request;