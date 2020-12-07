const service = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    id_service: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_service_request: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    worker_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_price: {
      type: DataTypes.DOUBLE,
    },
    service_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  service.sync({ logging: true });
  return service;
};

export default service;