const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const TokenService = require('./token.service');

class TokenController {
    createAccessToken(userId) {
        const payload = { id: uuidv4(), userId, type: 'access' };
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
        return token;
    }

    createRefreshToken() {
        const payload = { id: uuidv4(), type: 'refresh' };
        const refreshToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '2 days' });
        return refreshToken;
    }

    saveToken(tokenId, userId) {
        return TokenService.saveToken(tokenId, userId);
    }

    async replaceToken(oldTokenId, tokenId, userId) {
        return TokenService.replaceToken(oldTokenId, tokenId, userId);
    }

    removeToken(id) {
        TokenService.removeToken(id);
    }

    getPayloadFromToken(token) {
        return jwt.verify(token, process.env.JWT_KEY);
    }
};

module.exports = new TokenController();
