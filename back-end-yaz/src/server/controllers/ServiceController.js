import ServiceService from '../services/ServiceService';
import Util from '../utils/Utils';

const util = new Util();

class ServiceController {

    static async getAllServices(req, res) {
        try {
            const allService = await ServiceService.getAllServices();
            if(allService.length > 0){
                util.setSuccess(200, 'Service returned', allService)
            } else {
                util.setSuccess(500, 'No service found');
            }
            return util.send(res); 
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addService(req, res) {
        const newService = req.body
        try {
            const createdService = await ServiceService.addService(newService);
            util.setSuccess(201, `New service created!`, createdService);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateServiceById(req, res) {
        const { id } = req.params;
        const alteredService = req.body;
        try {
            const updateService = await ServiceService.updateServiceById(id, alteredService)
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(updateService){
                util.setSuccess(200, `Service ${id} updated!`);
            }else{
                util.setError(400, `Could not update service ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getServiceById(req, res) {
        const { id } = req.params;
        try {
            const theService = await ServiceService.getServiceById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(theService){
                util.setSuccess(200, `Service ${id} returned!`);
            }else{
                util.setSuccess(400, `Could not found service ${id}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteServiceById(req, res) {
        const { id } = req.params;
        try {
            const serviceToDelete = await ServiceService.deleteServiceById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(400, `You do not have permission to do this!`);
            } else if(serviceToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted service ${id}!`);
            }else{
                util.setError(400, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ServiceController;