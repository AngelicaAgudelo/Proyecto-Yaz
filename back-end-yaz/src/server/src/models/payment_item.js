const payment_item = (sequelize, DataTypes) => {
  const payment_item = sequelize.define('payment_item', {
    id_payment_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_item_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  payment_item.sync({logging: true });
  return payment_item;
};

export default payment_item;