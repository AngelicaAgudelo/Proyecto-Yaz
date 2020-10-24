import models from '../src/models';

class UserService {
  static async getAllUsers() {
    try {
      return await models.user.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await models.user.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id, updateUser) {
    try {
      const userToUpdate = await models.user.findOne({
        where: { id_user: Number(id) }
      });

      if (userToUpdate) {
        await models.user.update(updateUser, { where: { id_user: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const returnedUser = await models.user.findOne({
        where: { id_user: Number(id) }
      });

      return returnedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const userToDelete = await models.user.findOne({ where: { id_user: Number(id) } });

      if (userToDelete) {
        const deletedUser = await models.user.destroy({
          where: { id_user: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const returnedUser = await models.user.findOne({
        where: { user_email: email }
      });

      return returnedUser;
    } catch (error) {
      throw error;
    }
  }

  static async getAllWorkers() {
    try {
      return await models.user.findAll({ where: { user_type: 1 } });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;