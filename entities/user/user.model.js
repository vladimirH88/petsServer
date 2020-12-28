const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = User = sequelizeInstanse.sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
    },
    region: {
        type: Sequelize.STRING,
    },
    phoneNumber: {
        type: Sequelize.STRING,
    },
    additionalPhoneNumber: {
        type: Sequelize.STRING,
    },
});
