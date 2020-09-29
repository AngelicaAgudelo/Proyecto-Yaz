import database from '.../src/models';

class Payment_serviceService {
  static async getAllPayment_services() {
    try {
      return await database.Payment_service.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addPayment_service(newPayment_service) {
    try {
      return await database.Payment_service.create(newPayment_service);
    } catch (error) {
      throw error;
    }
  }

  static async updatePayment_serviceById(id, updatePayment_service) {
    try {
      const payment_serviceToUpdate = await database.Payment_service.findOne({
        where: { id_payment_service: Number(id_payment_service) }
      });

      if (payment_serviceToUpdate) {
        await database.Payment_service.update(updatePayment_service, { where: { id_payment_service: Number(id_payment_service) } });

        return updatePayment_service;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getPayment_serviceById(id) {
    try {
      const returnedPayment_service = await database.Payment_service.findOne({
        where: { id_payment_service: Number(id_payment_service) }
      });

      return returnedPayment_service;
    } catch (error) {
      throw error;
    }
  }

  static async deletePayment_serviceById(id) {
    try {
      const payment_serviceToDelete = await database.Payment_service.findOne({ where: { id_payment_service: Number(id_payment_service) } });

      if (payment_serviceToDelete) {
        const deletedPayment_service = await database.Payment_service.destroy({
          where: { id_payment_service: Number(id_payment_service) }
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