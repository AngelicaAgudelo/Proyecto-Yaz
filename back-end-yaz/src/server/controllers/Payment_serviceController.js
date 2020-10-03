import Payment_serviceService from '../services/Payment_serviceService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_serviceController {

    static async getAllPayment_services(req, res) {
        try {
            const allPayment_service = await Payment_serviceService.getAllPayment_services();
            if(allPayment_service.length > 0){
                util.setSuccess(200, 'Service receipt returned', allPayment_service)
            } else {
                util.setSuccess(204, 'No service receipt found');
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
            const createdPayment_service = await Payment_serviceService.addPayment_service(newPayment_service);
            util.setSuccess(201, `New service receipt created!`, createdPayment_service);
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
                util.setSuccess(201, `Service receipt ${id} updated!`);
            }else{
                util.setSuccess(204, `Could not update the service repeat ${id}!`)
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
                util.setSuccess(200, `Receipt service ${id} returned!`);
            }else{
                util.setSuccess(204, `Could not found receipt service ${id}!`);
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
            const payment_serviceToDelete = await Payment_serviceService.deletePayment_serviceById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(403, `You do not have permission to delete this service receipt!`);
            } else if(payment_serviceToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted service receipt ${id}!`);
            }else{
                util.setSuccess(204, `The payment receipt you are looking for can not be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default Payment_serviceController;