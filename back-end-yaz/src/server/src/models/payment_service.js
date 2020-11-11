const payment_service = (sequelize, DataTypes) => {
  const payment_service = sequelize.define('payment_service', {
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

  payment_service.sync({logging: true });
  return payment_service;
};

export default payment_service;