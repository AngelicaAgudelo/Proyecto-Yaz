import models from '../src/models';

class ItemService {
  static async getAllItems() {
    try {
      return await models.item.findAll();
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async addItem(newItem) {
    try {
      return await models.item.create(newItem);
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async updateItemById(id, updateItem) {
    try {
      const itemToUpdate = await models.item.findOne({
        where: { id_item: Number(id) }
      });

      if (itemToUpdate) {
        await models.item.update(updateItem, { where: { id_item: Number(id) } });

        return updateItem;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async getItemById(id) {
    try {
      const returnedItem = await models.item.findOne({
        where: { id_item: Number(id) }
      });

      return returnedItem;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async deleteItemById(id) {
    try {
      const itemToDelete = await models.item.findOne({ where: { id_item: Number(id) } });

      if (itemToDelete) {
        const deletedItem = await models.item.destroy({
          where: { id_item: Number(id) }
        });
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }
}

export default ItemService;