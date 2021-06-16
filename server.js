const path = require('path');
const express = require('express');
// use router instance from routes folder's index.js files
const routes = require('./controllers/');
// import the connection to Sequelize from config folder
const sequelize = require('./config/connection.js');
// import helper functions
const helpers = require('./utils/helpers');
// Set up Handlebars.js as the app's template engine of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
// use express-session to connect to the back-end
const session = require('express-session');
// use connect-session-sequelize library to automatically store sessions created by express-session into the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// establish connection to db and server
// force sync to make the tables re-create if there are any association changes when set to true
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});