const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_photo: {
        type: DataTypes.STRING,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_phone: {
        type: DataTypes.STRING,
      },
      user_address: {
        type: DataTypes.STRING,
      },
      user_address: {
        type: DataTypes.STRING,
      },
    });
   
    return User;
};

export default user;