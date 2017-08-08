/**
  * Module dependencies
  */
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
  * Routes handlers
  */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log(' Press CTRL-C to stop\n');
});

module.exports = app;
