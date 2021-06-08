// import the sequelize constructor from the library
const Sequelize = require('sequelize');
// npm package that hides MySQL username and password
require('dotenv').config();

// create connection to our database, pass in MySQL username and password
let sequelize;

// when app is deployed, it will have access to Heroku's JawsDB URL variable and use that value to connect
if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // when not deployed, use localhost configuration
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;