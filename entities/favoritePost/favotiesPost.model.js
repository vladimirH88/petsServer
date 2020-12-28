const Sequelize = require('sequelize');
const sequelizeInstanse = require('../../config/sequilize.config');

module.exports = FavoritesPosts = sequelizeInstanse.sequelize.define('favorite_posts', {
    postId: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
});
