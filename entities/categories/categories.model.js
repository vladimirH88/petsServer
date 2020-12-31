const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = Categories = sequelizeInstanse.sequelize.define('categories', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
