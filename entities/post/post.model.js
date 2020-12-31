const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = Post = sequelizeInstanse.sequelize.define('post', {
    isAgreed: {
        type: Sequelize.BOOLEAN,
    },
    createrId: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    briefDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    additionalPhone: {
        type: Sequelize.STRING,
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    filingDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    numberOfViews: {
        type: Sequelize.NUMBER,
    },
    image: {
        type: Sequelize.BLOB,
    },
});
