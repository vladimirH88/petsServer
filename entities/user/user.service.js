const User = require('./user.model');

class UserService {
	async createUser(user) {
		return User.create(user)
			.then(res => res)
			.catch(err => {
				console.log(err);
				return null;
			});
	};

	async updateUser(user) {
		return User.update(user, { where: { id: user.id } })
			.then(() => {
				return User.findOne({ where: { id: user.id }, raw: true })
			})
			.catch(err => {
				console.log(err);
				return null;
			});
	};

	async getUserByEmail(email) {
		return User.findOne({ where: { email }, raw: true })
			.then(user => user)
			.catch(err => {
				console.log(err);
				return null;
			});
	};

	async getUserById(id) {
		return User.findOne({ where: { id } })
			.then(user => user)
			.catch(err => {
				console.log(err);
				return null;
			});
	};

	async verifyUser(email, password) {
		try {
			const user = await this.getUserByEmail(email);
			return user.password == password;
		} catch (err) {
			return false;
		}
	};
};

module.exports = new UserService();
