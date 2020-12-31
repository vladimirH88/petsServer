const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = Regions = sequelizeInstanse.sequelize.define('regions', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
