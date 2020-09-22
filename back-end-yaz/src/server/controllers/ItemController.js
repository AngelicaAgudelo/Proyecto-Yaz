//import ItemService from '../services/ItemService';
import Util from '../utils/Utils';

const util = new Util();

class ItemController {

    static async getAllItems(req, res) {
        util.setSuccess(200, `All items returned!`);
        return util.send(res);
    }

    static async addItem(req, res) {
        util.setSuccess(200, `New item created!`);
        return util.send(res);
    }

    static async updateItemById(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        } else {
            util.setSuccess(200, `Item ${id} updated!`);
            return util.send(res);
        }
    }

    static async getItemById(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        } else {
            util.setSuccess(200, `Item ${id} returned!`);
            return util.send(res);
        }
    }

    static async deleteItemById(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        } else if (req.body.user_type > 0) {
            util.setError(400, `You do not have permission to do this!`);
            return util.send(res);
        } else {
            util.setSuccess(200, `User ${req.body.name} deleted Item ${id}!`);
            return util.send(res);
        }
    }
}

export default ItemController;