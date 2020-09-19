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

  return Payment_Service;
};

export default payment_service;