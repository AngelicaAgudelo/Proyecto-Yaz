import models from '../src/models';

class ServiceService {
  static async getAllServices() {
    try {
      const all_services = await models.service.findAll();
      const services_list = [];
      for (const service of all_services) {
        const service_request = await models.service_request.findOne({
          where: { id_service_request: Number(service.id_service_request) }
        });
        const new_service = {
          client_name: service_request.client_name,
          worker_name: service.worker_name,
          service_date_start: service_request.service_date_start,
          service_date_end: service_request.service_date_end,
          service_color: service_request.service_color,
          service_name: service_request.service_name,
          service_status: service.service_status,
          service_price: service.service_price,
          service_description: service_request.service_description
        };
        services_list.push(new_service);
      }
      return services_list;
    } catch (error) {
      throw error;
    }
  }

  static async addService(newService) {
    try {
      return await models.service.create(newService);
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async updateServiceById(id, updateService) {
    try {
      const serviceToUpdate = await models.service.findOne({
        where: { id_service: Number(id) }
      });

      if (serviceToUpdate) {
        await models.service.update(updateService, { where: { id_service: Number(id) } });

        return updateService;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async getServiceById(id) {
    try {
      const returnedService = await models.service.findOne({
        where: { id_service: Number(id) }
      });

      return returnedService;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }

  static async deleteServiceById(id) {
    try {
      const serviceToDelete = await models.service.findOne({ where: { id_service: Number(id) } });

      if (serviceToDelete) {
        const deletedService = await models.service.destroy({
          where: { id_service: Number(id) }
        });
        return deletedService;
      }
      return null;
    } catch (error) {
      throw error.errors[0].message.toString();
    }
  }
}

export default ServiceService;