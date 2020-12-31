const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const { passportJwtStrategy } = require('./middleware/passport');
passportJwtStrategy(passport);

const privateRouter = require('./routes/private');
const publicRouter = require('./routes/public');
const adminRouter = require('./routes/admin');

const auth = require('./services/auth.services');

const response = require('./services/response.service');

const app = express();

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');
app.use(passport.initialize());

app.post('/registration', auth.registration, (req, res) => { });
app.post('/login', auth.login);
app.post('/refresh', auth.refresh);
app.get('/logout', auth.logout, (req, res) => {
  res.send('logout');
});

app.use('/public', publicRouter);
app.use('/private', passport.authenticate('jwt', { session: false }), privateRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  response.responseError(res, {
    message: res.locals.message,
    error: res.locals.error
  }, err.status || 500)

});

module.exports = app;
