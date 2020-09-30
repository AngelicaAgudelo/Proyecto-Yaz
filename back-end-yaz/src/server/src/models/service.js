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

  Service.associate = models => {
    Service.belongsToMany(models.User,
      { foreignKey: 'id_client', as: 'user_service' }
    );

    Service.belongsToMany(models.User,
      { foreignKey: 'id_worker', as: 'worker_service' }
    );

    Service.hasOne(models.Payment_Service,
      { foreignKey: 'id_service', as: 'service_payment_service' }
    )
  };

  return Service;
};

export default service;