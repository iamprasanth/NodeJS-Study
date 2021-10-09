var createError = require('http-errors');
var express = require('express'); // OR const app = require('express')();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config()
const auth = require('./middlewares/httpAuthetication');
const routeLoggerMiddleware = require('./middlewares/routeLoggerMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

// initialize app
var app = express();

// Set view engine, default one for express-generator is 'jade'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());// Body parser for post request except html post form
app.use(express.urlencoded({ extended: false })); // Body parser for html post form
app.use(cookieParser());
// app.use(auth); // Basic HTTP authentication
app.use(express.static(path.join(__dirname, 'public')));// To get all static files mentioned in html, eg favicon
app.use(routeLoggerMiddleware);// All routes defined after this line will be go through this logger
// app.use([routeLoggerMiddleware, anotherMiddleware]);// Set array of middlewares for routes

// connect to DB
connectDB(process.env.MONGO_URL);

// initialize routes
require('./routes/index')(app);
const dishRouter = require('./routes/dishRouter')
app.use('/dishes', dishRouter)

// error handler
app.use(errorHandlerMiddleware);

// Catch 404
// Adding middleware to single route, This method cannot be used for restrcting the route to some user groups
app.all('*', routeLoggerMiddleware, (req, res, next) => {
  res.status(404).render('not-found');
})

// Another method to catch 404
app.use((req, res, next) => {
  res.status(404).render('not-found');
});

module.exports = app;
