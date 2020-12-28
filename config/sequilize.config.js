const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    define: {
        timestamps: false
    },
});

// sequelize.sync()
//     .then(result => console.log(result))
//     .catch(err => console.log(err));


module.exports = {
    sequelize,
};
