const payment_service = (sequelize, DataTypes) => {
  const Payment_Service = sequelize.define('payment_service', {
    id_payment_service: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Payment_Service.associate = models => {
    Payment_Service.belongsTo(models.Service,
      { foreignKey: 'id_service', as: 'service_payment_service', onDelete: 'CASCADE' }
    )
  };

  return Payment_Service;
};

export default payment_service;