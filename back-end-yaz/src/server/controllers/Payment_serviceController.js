import Payment_serviceService from '../services/Payment_serviceService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_serviceController {

    static async getAllPayment_services(req, res) {
        try {
            const allPayment_service = await Payment_serviceService.getAllPayment_services();
            if(allPayment_service.length > 0){
                util.setSuccess(200, 'Payment_service returned', allPayment_service)
            } else {
                util.setSuccess(204, 'No payment_service found');
            }
            return util.send(res);            
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addPayment_service(req, res) {
        const newPayment_service = req.body;
        try {
            const createdPayment_service = await Payment_serviceService.addItem(newPayment_service);
            util.setSuccess(201, `New payment_service created!`, createdPayment_service);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updatePayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            const updatePayment_service = await Payment_serviceService.updatePayment_serviceById(id, alteredItem)
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(updatePayment_service){
                util.setSuccess(201, `Item ${id} updated!`);
            }else{
                util.setSuccess(204, `Could not update item ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getPayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            const thePayment_service = await Payment_serviceService.getPayment_serviceById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(thePayment_service){
                util.setSuccess(200, `Item ${id} returned!`);
            }else{
                util.setSuccess(204, `Could not found item ${id}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deletePayment_serviceById(req, res) {
        const { id } = req.params;
        try {
            const payment_serviceToDelete = await Payment_serviceService.deleteItemById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(403, `You do not have permission to do this!`);
            } else if(payment_serviceToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted Item ${id}!`);
            }else{
                util.setSuccess(204, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default Payment_serviceController;