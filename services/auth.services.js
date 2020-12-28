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
            const candidate = { name, email, password: crypto.getHash(email + password)};
            const user = await userController.createUser(candidate);
            delete user.password;

            const accessToken = tokenController.createAccessToken(user.id);
            const refreshToken = tokenController.createRefreshToken();
            response.responseSuccess(res, {
                user,
                accessToken,
                refreshToken,
            }, 200);
        }
    },

    // login: async (req, res) => {
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     if (await userController.verifyUser(email, password)) {
    //         const user = await userController.getUserByEmail(email);
    //         delete user.password;
    //         const accessToken = tokenController.createAccessToken(user.id);
    //         const refreshToken = tokenController.createRefreshToken();
    //         const payload = tokenController.getPayloadFromToken(refreshToken);
    //         tokenController.saveToken(payload.id, user.id);
    //         response.responseSuccess(res, {
    //             user,
    //             accessToken,
    //             refreshToken,
    //         }, 200);
    //     } else {
    //         response.responseFailure(res, 'Пользователь не найден');
    //     }
    // },

    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const condidate = await userController.getUserByEmail(email);
        if (condidate && crypto.verifyHash(email + password, condidate.password)) {
            const user = await userController.getUserByEmail(email);
            delete user.password;
            const accessToken = tokenController.createAccessToken(user.id);
            const refreshToken = tokenController.createRefreshToken();
            const payload = tokenController.getPayloadFromToken(refreshToken);
            tokenController.saveToken(payload.id, user.id);
            response.responseSuccess(res, {
                user,
                accessToken,
                refreshToken,
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
            const userId = req.headers['user-id'];
            const payload = tokenController.getPayloadFromToken(token);
            if (payload.type !== 'refresh') {
                response.responseFailure(res, 'invalid token')
                return;
            }
            const accessToken = tokenController.createAccessToken(userId);
            const refreshToken = tokenController.createRefreshToken();
            const payloadORefrefreshToken = tokenController.getPayloadFromToken(refreshToken);
            tokenController.replaceToken(payload.id, payloadORefrefreshToken.id, userId)
                .then(() => {
                    response.responseSuccess(res, {
                        accessToken,
                        refreshToken,
                    }, 200)
                })
                .catch(err => {
                    response.responseError(err)
                })
        } catch (err) {
            response.responseError(err)
        }
    }
};
