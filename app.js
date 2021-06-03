var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const controlFoldersFiles = require('./models/control_folders_files');
const sequelize = require('./mySql/sequelize');


var indexRouter = require('./routes/home_page');
var usersRouter = require('./routes/users');
var usersFs = require('./routes/1_Browse_files/fs');
var controlrFils = require('./routes/2_controlr_fils/2_controlr_fils');
var automationScreenReport = require('./routes/automationReport/automationReportScreen');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
//Users + Passwords
const mongoose = require('mongoose');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
// const flash = require('connect-flash');
// const User = require('./models/user');
// const MONGODB_URI ='mongodb+srv://prepress:<shprepresssh>@cluster0-mhxnw.mongodb.net/test?retryWrites=true&w=majority';
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/Production-controller-users';
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });
// const csrfProtection = csrf();
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );
// app.use(csrfProtection);
// app.use(flash());
// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });
// mongoose
//   .connect(MONGODB_URI)
//   .then(result => {
//     // app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//Routers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(usersRouter);
app.use('/management-it', indexRouter);
app.use('/management-it-fs', usersFs);
app.use('/management-it-controlr-fils', controlrFils);
app.use('/automation-report', automationScreenReport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//Work folder control system
controlFoldersFiles.allControlers();

sequelize.sync().then(result => {
  console.log('Sequelize is coonect!!!');
}).catch(err => {
  console.log(err);
})


module.exports = app;



