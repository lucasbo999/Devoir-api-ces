var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catway');
var reservationsRouter = require('./routes/reservation')
var pagesRouter = require('./routes/pages');


const {initClientDbConnection} = require('./db/mongo');

var app = express();

initClientDbConnection();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', pagesRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter)
app.use('/reservations', reservationsRouter)


module.exports = app;
