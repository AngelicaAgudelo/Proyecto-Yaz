import models from '../models';

class Payment_itemsService {
  static async getAllPayment_itemss() {
    try {
      return await models.Payment_items.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addPayment_items(newPayment_items) {
    try {
      return await models.Payment_items.create(newPayment_items);
    } catch (error) {
      throw error;
    }
  }

  static async updatePayment_itemsById(id, updatePayment_items) {
    try {
      const payment_itemsToUpdate = await models.Payment_items.findOne({
        where: { id_payment_item: Number(id) }
      });

      if (payment_itemsToUpdate) {
        await models.Payment_items.update(updatePayment_items, { where: { id_payment_item: Number(id) } });

        return updatePayment_items;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getPayment_itemsById(id) {
    try {
      const returnedPayment_items = await models.Payment_items.findOne({
        where: { id_payment_item: Number(id) }
      });

      return returnedPayment_items;
    } catch (error) {
      throw error;
    }
  }

  static async deletePayment_itemsById(id) {
    try {
      const payment_itemsToDelete = await models.Payment_items.findOne({ where: { id_payment_item: Number(id) } });

      if (payment_itemsToDelete) {
        const deletedPayment_items = await models.Payment_items.destroy({
          where: { id_payment_item: Number(id) }
        });
        return deletedPayment_items;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default Payment_itemsService;