const userService = require('./user.service');
const response = require('../../services/response.service');

class UserController {
    async createUser(user) {
        const newUser = await userService.createUser(user);
        if (newUser) {
            return newUser;
        }
        return null;
    };

    async updateUser(req, res) {
        const user = await userService.updateUser(req.body.user);
        if (user) {
            delete user.password;
            return response.responseSuccess(res, user);
        }
        response.responseError(res);
    };

    async getUserByEmail(email) {
        const user = await userService.getUserByEmail(email);
        if (user) {
            return user;
        }
        return null;
    };

    async getUserById(id) {
        const user = await userService.getUserById(id);
        if (user) {
            return user;
        }
        return null;
    };

    async verifyUser(email, password) {
        try {
            const user = await userService.getUserByEmail(email);
            console.log(user.password, password)
            return user.password == password;
        } catch (err) {
            return false;
        }
    };
};

module.exports = new UserController();
