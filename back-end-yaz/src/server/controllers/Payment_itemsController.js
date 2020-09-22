//import Payment_itemsService from '../services/Payment_itemsService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_itemsController {

    static async getAllPayment_items(req, res) {
        util.setSuccess(200, `All payment_items returned!`);
        return util.send(res);
    }

    static async addPayment_items(req, res) {
        util.setSuccess(200, `New payment_items created!`);
        return util.send(res);
    }

    static async updatePayment_itemsById(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        } else {
            util.setSuccess(200, `Payment_items ${id} updated!`);
            return util.send(res);
        }
    }

    static async getPayment_itemsById(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        } else {
            util.setSuccess(200, `Payment_items ${id} returned!`);
            return util.send(res);
        }
    }

    static async deletePayment_itemsById(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        } else if (req.body.user_type > 0) {
            util.setError(400, `You do not have permission to do this!`);
            return util.send(res);
        } else {
            util.setSuccess(200, `User ${req.body.name} deleted Payment_items ${id}!`);
            return util.send(res);
        }
    }
}

export default Payment_itemsController;