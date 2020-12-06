import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {

    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();
            if (allUsers.length > 0) {
                util.setSuccess(200, 'Users returned', allUsers)
            } else {
                util.setSuccess(204, 'No users found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addUser(req, res) {
        const newUser = req.body;
        try {
            const createdUser = await UserService.addUser(newUser);
            util.setSuccess(201, `new User created!`, createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateUserById(req, res) {
        const { id } = req.params;
        const alteredUser = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateUser = await UserService.updateUserById(id, alteredUser)
            if (updateUser) {
                util.setSuccess(201, `User ${id} updated!`, alteredUser);
            } else {
                util.setSuccess(204, `Could not update user ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const returnedUser = await UserService.getUserById(id);
            if (returnedUser) {
                util.setSuccess(200, `User ${id} returned!`, returnedUser);
            } else {
                util.setSuccess(204, `Could not found user ${id}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteUserById(req, res) {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const userToDelete = await UserService.deleteUserById(id);
            if (userToDelete) {
                util.setSuccess(200, `Deleted user ${id}!`, userToDelete);
            } else {
                util.setSuccess(204, `The user you are looking for can not be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserByEmail(req, res) {
        const requiredUser = req.params.email;
        try {
            const returnedUser = await UserService.getUserByEmail(requiredUser)
            if (returnedUser) {
                util.setSuccess(200, `User ${requiredUser} returned!`, returnedUser);
            } else {
                util.setSuccess(204, `Could not found user ${requiredUser}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getAllUsersByType(req, res) {
        const { type } = req.params;
        try {
            const returnedUser = await UserService.getAllUsersByType(type);
            if (!Number(type)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if (returnedUser) {
                util.setSuccess(200, `User with type ${type} returned!`, returnedUser);
            } else {
                util.setSuccess(204, `Could not found user ${type}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserByName(req, res) {
        const requiredUser = req.params.name;
        try {
            const returnedUser = await UserService.getUserByName(requiredUser)
            if (returnedUser) {
                util.setSuccess(200, `User ${requiredUser} returned!`, returnedUser);
            } else {
                util.setSuccess(204, `Could not found user ${requiredUser}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default UserController;