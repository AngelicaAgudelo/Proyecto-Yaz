import database from '.../src/models';

class ServiceService {
  static async getAllServices() {
    try {
      return await database.Service.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addService(newService) {
    try {
      return await database.Service.create(newService);
    } catch (error) {
      throw error;
    }
  }

  static async updateServiceById(id, updateService) {
    try {
      const serviceToUpdate = await database.Service.findOne({
        where: { id_service: Number(id_service) }
      });

      if (serviceToUpdate) {
        await database.Service.update(updateService, { where: { id_service: Number(id_service) } });

        return updateService;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getServiceById(id) {
    try {
      const returnedService = await database.Service.findOne({
        where: { id_service: Number(id_service) }
      });

      return returnedService;
    } catch (error) {
      throw error;
    }
  }

  static async deleteServiceById(id) {
    try {
      const serviceToDelete = await database.Service.findOne({ where: { id_service: Number(id_service) } });

      if (serviceToDelete) {
        const deletedService = await database.Service.destroy({
          where: { id_service: Number(id_service) }
        });
        return deletedService;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ServiceService;