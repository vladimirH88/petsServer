const Token = require('./token.model');

class TokenService {
	async saveToken(tokenId, userId) {
		return Token.create({ tokenId, userId })
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	async replaceToken(oldTokenId, newTokenId, userId) {
		return Token.update({ tokenId: newTokenId, userId }, {
			where: {
				tokenId: oldTokenId,
				userId,
			}
		})
			.then(res => res)
			.catch(err => err)
	}

	removeToken(tokenId) {
		Token.destroy({ where: { tokenId } });
	}
};

module.exports = new TokenService();
