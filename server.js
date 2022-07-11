var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//importing routers
const adminRoutes =  require('./routes/admin');
const patientRoutes = require('./routes/patients')
const drRouters = require('./routes/doctors')
var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://127.0.0.1:27017/hospital'
)
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin' ,adminRoutes)
app.use('/patients',patientRoutes);
app.use('/doctors', drRouters)
app.use('/', indexRouter);



app.post('/patient', (req,res, next) => {
  //by default request does not parse incomeing request body. to dio that we need registr parser
  console.log(req.body)
  res.redirect('/');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
