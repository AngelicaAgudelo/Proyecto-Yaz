//import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {

    static async getAllUsers(req, res) {
        try {
            util.setSuccess(200, `All users returned!`);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addUser(req, res) {
        try {
            util.setSuccess(200, `New user created!`);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateUserById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `User ${id} updated!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
                return util.send(res);
            } else {
                util.setSuccess(200, `User ${id} returned!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteUserById(req, res) {
        const { id } = req.params;
        try {
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
                return util.send(res);
            } else if (req.body.user_type > 0) {
                util.setError(400, `You do not have permission to do this!`);
                return util.send(res);
            } else {
                util.setSuccess(200, `User ${req.body.name} deleted user ${id}!`);
                return util.send(res);
            }
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default UserController;