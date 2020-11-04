import Payment_itemsService from '../services/Payment_itemsService';
import Util from '../utils/Utils';

const util = new Util();

class Payment_itemsController {

    static async getAllPayment_items(req, res) {
        try {
            const allPayment_items = await Payment_itemsService.getAllPayment_items();
            if(allPayment_items.length > 0){
                util.setSuccess(200, 'Item receipt returned', allPayment_items)
            } else {
                util.setSuccess(204, 'No item receipt found');
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
            const createdPayment_items = await Payment_itemsService.addPayment_items(newPayment_items);
            util.setSuccess(201, `New item receipt created!`, createdPayment_items);
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
                util.setSuccess(201, `Item receipt ${id} updated!`, updatePayment_items);
            } else {
                util.setSuccess(204, `Item receipt ${id} could not be updated!`);
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
            const returnedPayment_items = await Payment_itemsService.getPayment_itemsById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } if(returnedPayment_items) {
                util.setSuccess(200, `Item receipt ${id} returned!`, returnedPayment_items);
            }else {
                util.setSuccess(204, 'Could not return any item receipt');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }        
    }

    static async deletePayment_itemsById(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const payment_itemsToDelete = await Payment_itemsService.deletePayment_itemsById(id);
            if(payment_itemsToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted items receipt ${id}!`, payment_itemsToDelete);
            }else{
                util.setSuccess(204, `The item receipt you are looking for can not be found`);
            }
            return util.send(res);           
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default Payment_itemsController;