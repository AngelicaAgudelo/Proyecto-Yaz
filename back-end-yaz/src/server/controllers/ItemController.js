import ItemService from '../services/ItemService';
import Util from '../utils/Utils';

const util = new Util();

class ItemController {

    static async getAllItems(req, res) {
        try {
            const allItems = await ItemService.getAllItems();
            if(allItems.length > 0){
                util.setSuccess(200, 'Items returned', allItems)
            } else {
                util.setSuccess(204, 'No items found');
            }
            return util.send(res);            
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addItem(req, res) {
        const newItem = req.body
        try {
            const createdItem = await ItemService.addItem(newItem);
            util.setSuccess(201, `New item created!`, createdItem);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateItemById(req, res) {
        const { id } = req.params;
        const alteredItem = req.body;
        try {
            const updateItem = await ItemService.updateItemById(id, alteredItem)
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(updateItem){
                util.setSuccess(202, `Item ${id} updated!`);
            }else{
                util.setSuccess(204, `Could not update item ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }        
    }

    static async getItemById(req, res) {
        const { id } = req.params;
        try {
            const theItem = await ItemService.getItemById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(theItem){
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

    static async deleteItemById(req, res) {
        const { id } = req.params;
        try {
            const itemToDelete = await ItemService.deleteItemById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(403, `You do not have permission to do this!`);
            } else if(itemToDelete){
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

export default ItemController;