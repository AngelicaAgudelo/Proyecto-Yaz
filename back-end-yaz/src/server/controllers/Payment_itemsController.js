import Payment_itemsService from '../services/Payment_itemsService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_itemsController {

    static async getAllPayment_items(req, res) {
        try {
            const allPayment_items = await Payment_itemsService.getAllPayment_itemss();
            if(allPayment_items.length > 0){
                util.setSuccess(200, 'Payment_items returned', allPayment_items)
            } else {
                util.setSuccess(204, 'No payment_items found');
            }
            return util.send(res);               
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addPayment_items(req, res) {
        const newPayment_items = req.body;
        try {
            const createdPayment_items = await Payment_itemsService.addItem(newPayment_items);
            util.setSuccess(201, `New payment_items created!`, createdPayment_items);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        };
    }

    static async updatePayment_itemsById(req, res) {
        const { id } = req.params;
        const alteredPayment_items = req.body;
        try {
            const updatePayment_items = await Payment_itemsService.updatePayment_itemsById(id, alteredPayment_items)
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            }if(updatePayment_items){
                util.setSuccess(202, `Payment_items ${id} updated!`);
            } else {
                util.setSuccess(204, `Payment_items ${id} could not be updated!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }       
    }

    static async getPayment_itemsById(req, res) {
        const { id } = req.params;
        try {
            const thePayment_items = await Payment_itemsService.getPayment_itemsById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } if(thePayment_items) {
                util.setSuccess(200, `Payment_items ${id} returned!`);
            }else {
                util.setSuccess(204, 'Could not return any payment_items');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }        
    }

    static async deletePayment_itemsById(req, res) {
        const { id } = req.params;
        try {
            const payment_itemsToDelete = await Payment_itemsService.deletePayment_itemsById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(403, `You do not have permission to do this!`);
            } else if(payment_itemsToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted payment_items ${id}!`);
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

export default Payment_itemsController;