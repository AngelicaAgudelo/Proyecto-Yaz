import models from '../src/models';

class Payment_serviceService {
  static async getAllPayment_services() {
    try {
      return await models.Payment_service.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addPayment_service(newPayment_service) {
    try {
      return await models.Payment_service.create(newPayment_service);
    } catch (error) {
      throw error;
    }
  }

  static async updatePayment_serviceById(id, updatePayment_service) {
    try {
      const payment_serviceToUpdate = await models.Payment_service.findOne({
        where: { id_payment_service: Number(id) }
      });

      if (payment_serviceToUpdate) {
        await models.Payment_service.update(updatePayment_service, { where: { id_payment_service: Number(id) } });

        return updatePayment_service;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getPayment_serviceById(id) {
    try {
      const returnedPayment_service = await models.Payment_service.findOne({
        where: { id_payment_service: Number(id) }
      });

      return returnedPayment_service;
    } catch (error) {
      throw error;
    }
  }

  static async deletePayment_serviceById(id) {
    try {
      const payment_serviceToDelete = await models.Payment_service.findOne({ where: { id_payment_service: Number(id) } });

      if (payment_serviceToDelete) {
        const deletedPayment_service = await models.Payment_service.destroy({
          where: { id_payment_service: Number(id) }
        });
        return deletedPayment_service;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default Payment_serviceService;