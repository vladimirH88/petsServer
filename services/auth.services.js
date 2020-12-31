const crypto = require('./crypto.services');
const userController = require('../entities/user/user.controller');
const response = require('./response.service');
const tokenController = require('../entities/token/token.controller');

getTokenFromHeader = (request) => {
    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        return bearerToken;
    }
    return false;
};

module.exports = {
    registration: async (req, res) => {
        if (await userController.getUserByEmail(req.body.email)) {
            response.responseFailure(res, 'Такой пользователь уже есть');
        } else {
            const { name, email, password } = req.body;
            const candidate = { name, email, password: crypto.getHash(email + password) };
            const newUser = await userController.createUser(candidate);
            const { password: p, ...user } = newUser;
            response.responseSuccess(res, {
                user,
                accessToken: tokenController.createAccessToken(user.id),
                refreshToken: tokenController.createRefreshToken(),
            }, 200);
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const condidate = await userController.getUserByEmail(email);
        if (condidate && crypto.verifyHash(email + password, condidate.password)) {
            const { password : p, ...user } = condidate;
            response.responseSuccess(res, {
                user,
                accessToken: tokenController.createAccessToken(user.id),
                refreshToken: tokenController.createRefreshToken(),
            }, 200);
        } else {
            response.responseFailure(res, 'Пользователь не найден');
        }
    },

    logout: (req, res) => {
        const token = req.headers['refresh'];
        if (token) {
            const payload = tokenController.getPayloadFromToken(token);
            tokenController.removeToken(payload.id);
            response.responseSuccess(res, undefined, 200)
        } else {
            response.responseError(res, 'Токен не найден');
        }
    },

    refresh: (req, res) => {
        try {
            const token = req.headers['refresh'];
            const userId = req.headers['x-user-id'];
            const payload = tokenController.getPayloadFromToken(token);
            if (payload.type !== 'refresh') {
                response.responseFailure(res, 'invalid token')
                return;
            }
            response.responseSuccess(res, {
                accessToken: tokenController.createAccessToken(userId),
                refreshToken: tokenController.createRefreshToken(),
            }, 200)
        } catch (err) {
            response.responseError(err)
        }
    }
};
