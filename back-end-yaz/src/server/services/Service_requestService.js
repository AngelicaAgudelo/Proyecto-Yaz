import models from '../src/models';

class Service_requestService {
    static async getAllService_requests() {
        try {
            return await models.service_request.findAll();
        } catch (error) {
            throw error.errors[0].message.toString();
        }
    }

    static async addService_request(newService_request) {
        try {
            return await models.service_request.create(newService_request);
        } catch (error) {
            throw error.errors[0].message.toString();
        }
    }

    static async updateService_requestById(id, updateService_request) {
        try {
            const service_requestToUpdate = await models.service_request.findOne({
                where: { id_service_request: Number(id) }
            });

            if (service_requestToUpdate) {
                await models.service_request.update(updateService_request, { where: { id_service_request: Number(id) } });

                return updateService_request;
            }
            return null;
        } catch (error) {
            throw error.errors[0].message.toString();
        }
    }

    static async getService_requestById(id) {
        try {
            const returnedService_request = await models.service_request.findOne({
                where: { id_service_request: Number(id) }
            });

            return returnedService_request;
        } catch (error) {
            throw error.errors[0].message.toString();
        }
    }

    static async deleteService_requestById(id) {
        try {
            const service_requestToDelete = await models.service_request.findOne({ where: { id_service_request: Number(id) } });

            if (service_requestToDelete) {
                const deletedService_request = await models.service_request.destroy({
                    where: { id_service_request: Number(id) }
                });
                return deletedService_request;
            }
            return null;
        } catch (error) {
            throw error.errors[0].message.toString();
        }
    }
}

export default Service_requestService;