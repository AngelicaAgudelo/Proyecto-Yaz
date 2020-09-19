const service = (sequelize, DataTypes) => {
    const Service = sequelize.define('service', {
      id_service: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_client: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_worker: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_date_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      service_date_end: {
        type: DataTypes.DATE,
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
      service_price: {
        type: DataTypes.DOUBLE,
      },
      service_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
   
    return Service;
};

export default service;