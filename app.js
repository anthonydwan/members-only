/////// app.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const messageRouter = require('./routes/message-form');
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/sign-up-form');
const loginRouter = require('./routes/log-in-form');

const Member = require('./models/memberModel');

const dotenv = require('dotenv').config();

const mongoDb = `mongodb+srv://${process.env.MONGODB_ACC}:${process.env.MONGODB_PW}@cluster0.67bm9.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

/* 
this function is called when we use the passport.authenticate() 
it takes a username and password, tries to find the user in our DB\
and compare the passwords 
*/
passport.use(
  new LocalStrategy((username, password, done) => {
    Member.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  })
);

/* passpost use some data to create a cookie to be stored in user's browser. 
These two functions defined what bit of 
information passport is looking for when cretes and decodes the cookie
*/

passport.serializeUser((member, done) => done(null, member.id));
passport.deserializeUser((id, done) =>
  Member.findById(id, (err, member) => done(err, member))
);

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// you need this to parse the body using req.body
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/sign-up', signupRouter);
// app.use('/log-in', loginRouter);

app.get('/log-in', (req, res) => {
  res.render('log-in-form', { member: req.member });
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  })
);

app.get('/log-out', (req, res) => {
  req.logout();
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('app listening on port 3000!'));
