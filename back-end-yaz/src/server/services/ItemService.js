import database from '.../src/models';

class ItemService {
  static async getAllItems() {
    try {
      return await database.Item.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addItem(newItem) {
    try {
      return await database.Item.create(newItem);
    } catch (error) {
      throw error;
    }
  }

  static async updateItemById(id, updateItem) {
    try {
      const itemToUpdate = await database.Item.findOne({
        where: { id_item: Number(id) }
      });

      if (itemToUpdate) {
        await database.Item.update(updateItem, { where: { id_item: Number(id) } });

        return updateItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getItemById(id) {
    try {
      const returnedItem = await database.Item.findOne({
        where: { id_item: Number(id) }
      });

      return returnedItem;
    } catch (error) {
      throw error;
    }
  }

  static async deleteItemById(id) {
    try {
      const itemToDelete = await database.Item.findOne({ where: { id_item: Number(id) } });

      if (itemToDelete) {
        const deletedItem = await database.Item.destroy({
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