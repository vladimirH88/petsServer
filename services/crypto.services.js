const crypto = require('crypto');


const getHash = (string) => {
	const secret = 'abcdefg';
	const hash = crypto.createHmac('sha256', secret)
		.update(string)
		.digest('hex');
	return hash;
};
const verifyHash = (string, hash) => {
	console.log('getHash :', getHash(string), hash)
	return getHash(string) === hash;
};

module.exports = {
	getHash,
	verifyHash,
};
