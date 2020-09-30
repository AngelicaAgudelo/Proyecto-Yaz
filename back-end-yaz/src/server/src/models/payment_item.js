const payment_item = (sequelize, DataTypes) => {
  const Payment_Item = sequelize.define('payment_item', {
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

  Payment_Item.associate = models => {
    Payment_Item.belongsTo(models.Item,
      { foreignKey: 'id_item', as: 'item_payment_item' }
    );

    Payment_Item.belongsTo(models.User,
      { foreignKey: 'id_client', as: 'user_payment_item' }
    );
  }

  return Payment_Item;
};

export default payment_item;