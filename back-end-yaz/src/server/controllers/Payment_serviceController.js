//import Payment_serviceService from '../services/Payment_serviceService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_serviceController {

    static async getAllPayment_services(req, res) {
        try {
            util.setSuccess(200, `All payment_services returned!`);
            return util.send(res);            
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addPayment_service(req, res) {
        try {
            util.setSuccess(200, `New payment_service created!`);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updatePayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `Payment_service ${id} updated!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getPayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `Payment_service ${id} returned!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deletePayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
                return util.send(res);
            } else if (req.body.user_type > 0) {
                util.setError(400, `You do not have permission to do this!`);
                return util.send(res);
            } else {
                util.setSuccess(200, `User ${req.body.name} deleted Payment_service ${id}!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default Payment_serviceController;