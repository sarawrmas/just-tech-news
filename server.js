const path = require('path');
const express = require('express');
// use router instance from routes folder's index.js files
const routes = require('./controllers/');
// import the connection to Sequelize from config folder
const sequelize = require('./config/connection.js');
// Set up Handlebars.js as the app's template engine of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// establish connection to db and server
// force sync to make the tables re-create if there are any association changes when set to true
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});