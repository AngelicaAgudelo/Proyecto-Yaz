import models from '../src/models';

class Payment_itemsService {
  static async getAllPayment_items() {
    try {
      return await models.payment_item.findAll();
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async addPayment_items(newPayment_items) {
    try {
      return await models.payment_item.create(newPayment_items);
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async updatePayment_itemsById(id, updatePayment_item) {
    try {
      const payment_itemsToUpdate = await models.payment_item.findOne({
        where: { id_payment_item: Number(id) }
      });

      if (payment_itemsToUpdate) {
        await models.payment_item.update(updatePayment_item, { where: { id_payment_item: Number(id) } });

        return updatePayment_item;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async getPayment_itemsById(id) {
    try {
      const returnedPayment_items = await models.payment_item.findOne({
        where: { id_payment_item: Number(id) }
      });

      return returnedPayment_items;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async deletePayment_itemsById(id) {
    try {
      const payment_itemsToDelete = await models.payment_item.findOne({ where: { id_payment_item: Number(id) } });

      if (payment_itemsToDelete) {
        const deletedPayment_items = await models.payment_item.destroy({
          where: { id_payment_item: Number(id) }
        });
        return deletedPayment_items;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }
}

export default Payment_itemsService;