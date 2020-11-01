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
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateItem = await ItemService.updateItemById(id, alteredItem)
            if(updateItem){
                util.setSuccess(201, `Item ${id} updated!`, updateItem);
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
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const returnedItem = await ItemService.getItemById(id);
            if(returnedItem){
                util.setSuccess(200, `Item ${id} returned!`, returnedItem);
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
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const itemToDelete = await ItemService.deleteItemById(id);
            if(itemToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted Item ${id}!`,itemToDelete);
            }else{
                util.setSuccess(204, `The item you are looking for can not be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ItemController;