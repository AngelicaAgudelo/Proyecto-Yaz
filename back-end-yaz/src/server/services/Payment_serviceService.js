import models from '../src/models';

class Payment_serviceService {
  static async getAllPayment_services() {
    try {
      return await models.payment_service.findAll();
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async addPayment_service(newPayment_service) {
    try {
      return await models.payment_service.create(newPayment_service);
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async updatePayment_serviceById(id, updatePayment_service) {
    try {
      const payment_serviceToUpdate = await models.payment_service.findOne({
        where: { id_payment_service: Number(id) }
      });

      if (payment_serviceToUpdate) {
        await models.payment_service.update(updatePayment_service, { where: { id_payment_service: Number(id) } });

        return updatePayment_service;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async getPayment_serviceById(id) {
    try {
      const returnedPayment_service = await models.payment_service.findOne({
        where: { id_payment_service: Number(id) }
      });

      return returnedPayment_service;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async deletePayment_serviceById(id) {
    try {
      const payment_serviceToDelete = await models.payment_service.findOne({ where: { id_payment_service: Number(id) } });

      if (payment_serviceToDelete) {
        const deletedPayment_service = await models.payment_service.destroy({
          where: { id_payment_service: Number(id) }
        });
        return deletedPayment_service;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }
}

export default Payment_serviceService;