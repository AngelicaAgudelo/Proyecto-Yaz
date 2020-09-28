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
        where: { id: Number(id) }
      });

      if (serviceToUpdate) {
        await database.Service.update(updateService, { where: { id: Number(id) } });

        return updateService;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getServiceById(id) {
    try {
      const theService = await database.Service.findOne({
        where: { id: Number(id) }
      });

      return theService;
    } catch (error) {
      throw error;
    }
  }

  static async deleteServiceById(id) {
    try {
      const serviceToDelete = await database.Service.findOne({ where: { id: Number(id) } });

      if (serviceToDelete) {
        const deletedService = await database.Service.destroy({
          where: { id: Number(id) }
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