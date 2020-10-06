import models from '../src/models';

class ItemService {
  static async getAllItems() {
    try {
      return await models.Item.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addItem(newItem) {
    try {
      return await models.Item.create(newItem);
    } catch (error) {
      throw error;
    }
  }

  static async updateItemById(id, updateItem) {
    try {
      const itemToUpdate = await models.Item.findOne({
        where: { id_item: Number(id) }
      });

      if (itemToUpdate) {
        await models.Item.update(updateItem, { where: { id_item: Number(id) } });

        return updateItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getItemById(id) {
    try {
      const returnedItem = await models.Item.findOne({
        where: { id_item: Number(id) }
      });

      return returnedItem;
    } catch (error) {
      throw error;
    }
  }

  static async deleteItemById(id) {
    try {
      const itemToDelete = await models.Item.findOne({ where: { id_item: Number(id) } });

      if (itemToDelete) {
        const deletedItem = await models.Item.destroy({
          where: { id_item: Number(id) }
        });
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ItemService;