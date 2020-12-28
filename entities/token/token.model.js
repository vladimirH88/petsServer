const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = Token = sequelizeInstanse.sequelize.define('tokens', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tokenId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
