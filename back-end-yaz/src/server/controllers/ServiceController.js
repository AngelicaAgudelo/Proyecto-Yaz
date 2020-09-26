//import ServiceService from '../services/ServiceService';
import Util from '../utils/Utils';

const util = new Util();

class ServiceController {

    static async getAllServices(req, res) {
        try {
            util.setSuccess(200, `All services returned!`);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addService(req, res) {
        try {
            util.setSuccess(200, `New service created!`);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateServiceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `Service ${id} updated!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getServiceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `Service ${id} returned!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteServiceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
                return util.send(res);
            } else if (req.body.user_type > 0) {
                util.setError(400, `You do not have permission to do this!`);
                return util.send(res);
            } else {
                util.setSuccess(200, `User ${req.body.name} deleted service ${id}!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ServiceController;