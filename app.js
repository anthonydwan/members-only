/////// app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageRouter = require('./routes/message-form');
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/sign-up-form');

const dotenv = require('dotenv').config();

const mongoDb = `mongodb+srv://${process.env.MONGODB_ACC}:${process.env.MONGODB_PW}@cluster0.67bm9.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/sign-up', signupRouter);

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('app listening on port 3000!'));
