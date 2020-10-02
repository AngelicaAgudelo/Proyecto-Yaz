import models from '../src/models';

class UserService {
  static async getAllUsers() {
    try {
      return await models.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await models.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id, updateUser) {
    try {
      const userToUpdate = await models.User.findOne({
        where: { id_user: Number(id) }
      });

      if (userToUpdate) {
        await models.User.update(updateUser, { where: { id_user: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const returnedUser = await models.User.findOne({
        where: { id_user: Number(id) }
      });

      return returnedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const userToDelete = await models.User.findOne({ where: { id_user: Number(id) } });

      if (userToDelete) {
        const deletedUser = await models.User.destroy({
          where: { id_user: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;