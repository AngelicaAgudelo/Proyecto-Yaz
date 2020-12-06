import Service_requestService from '../services/Service_requestService';
import Util from '../utils/Utils';

const util = new Util();

class Service_requestController {

    static async getAllService_requests(req, res) {
        try {
            const allService_request = await Service_requestService.getAllService_requests();
            if (allService_request.length > 0) {
                util.setSuccess(200, 'Service request returned', allService_request)
            } else {
                util.setSuccess(204, 'No service request found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addService_request(req, res) {
        const newService_request = req.body
        const { worker_id } = req.params;
        if (!Number.isInteger(Number(worker_id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const createdService_request = await Service_requestService.addService_request(newService_request, worker_id);
            if (createdService_request) {
                util.setSuccess(201, 'New service request created!', createdService_request);
            } else {
                util.setSuccess(204, 'Could not create the service request!')
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateService_requestById(req, res) {
        const { id } = req.params;
        const alteredService_resquest = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateService_request = await Service_requestService.updateService_requestById(id, alteredService_resquest)
            if (updateService_request) {
                util.setSuccess(201, `Service request ${id} updated!`, updateService_request);
            } else {
                util.setSuccess(204, `Could not update service request ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getService_requestById(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const returnedService_request = await Service_requestService.getService_requestById(id);
            if (returnedService_request) {
                util.setSuccess(200, `Service request ${id} returned!`, returnedService_request);
            } else {
                util.setSuccess(204, `Could not found service request ${id}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteService_requestById(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const service_requestToDelete = await Service_requestService.deleteService_requestById(id);
            if (service_requestToDelete) {
                util.setSuccess(200, `User ${req.body.name} deleted service request ${id}!`, service_requestToDelete);
            } else {
                util.setSuccess(204, 'The service you are looking for can not be found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default Service_requestController;