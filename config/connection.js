// import the sequelize constructor from the library
const Sequelize = require('sequelize');
// npm package that hides MySQL username and password
require('dotenv').config();

// create connection to our databse, pass in MySQL username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;