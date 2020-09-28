import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {

    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();
            if(allUsers.length > 0){
                util.setSuccess(200, 'Users returned', allUsers)
            } else {
                util.setSuccess(500, 'No users found');
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
        try {
            const updateUser = await UserService.updateUserById(id, alteredUser)
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(updateUser){
                util.setSuccess(200, `User ${id} updated!`);
            }else{
                util.setError(400, `Could not update user ${id}!`)
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const theUser = await UserService.getUserById(id);
            if (!Number(id)) {
                util.setError(400, 'Please input a valid numeric value');
            } else if(theUser){
                util.setSuccess(200, `User ${id} returned!`);
            }else{
                util.setSuccess(400, `Could not found user ${id}!`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteUserById(req, res) {
        const { id } = req.params;
        try {
            const userToDelete = await UserService.deleteUserById(id);
            if (!Number(id)) {
                util.setError(400, 'Please provide a numeric value');
            } else if (req.body.user_type > 0) {
                util.setError(400, `You do not have permission to do this!`);
            } else if(userToDelete){
                util.setSuccess(200, `User ${req.body.name} deleted user ${id}!`);
            }else{
                util.setError(400, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default UserController;