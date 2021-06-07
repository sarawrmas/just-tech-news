const express = require('express');
// use router instance from routes folder's index.js files
const routes = require('./routes');
// import the connection to Sequelize from config folder
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// establish connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});