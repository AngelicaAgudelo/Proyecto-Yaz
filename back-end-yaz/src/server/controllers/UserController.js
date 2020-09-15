//import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {

    static async getAllUsers(req, res) {
        util.setSuccess(200, `All users returned!`);
        return util.send(res);
    }

    static async addUser(req, res) {
        /*
      if (!req.body.email || !req.body.password) {
        util.setError(400, 'Please provide complete data');
        return util.send(res);
      }*/
        //const newUser = req.body;
        util.setSuccess(200, `New user created!`);
        return util.send(res);
    }

    static async updateUserById(req, res) {
        //const alteredUser = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        util.setSuccess(200, `User ${id} updated!`);
        return util.send(res);
    }

    static async getUserById(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        util.setSuccess(200, `User ${id} returned!`);
        return util.send(res);
    }

    static async deleteUserById(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        } else {
            util.setSuccess(200, `User ${id} deleted!`);
            return util.send(res);
        }
    }
}

export default UserController;