const express = require('express');
const logger = require('morgan');
var passport = require('passport');
var createError = require('http-errors');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');
// var customersRouter = require('./routes/customers');
global.config = require('./config');
require('dotenv').config()

const PORT = 3001;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/', indexRouter);
app.use('/api/auth', usersRouter);
// app.use('/customers', customersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.headers)
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err)
    res.locals.message = err.message;
    // res.locals.error = req.app.get('.env') === 'development' ? err : {};
    res.locals.error =  err

    // render the error page
    res.status(err.status || 500);
    console.log('---------------------------Error---------------------')
    console.log(err)
    res.send({message:err}.message)
    // res.render('error');
});

app.listen(PORT, function () {
    console.log(`Server started at ${PORT}`)
})