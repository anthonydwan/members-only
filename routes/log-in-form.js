const Router = require('express');
const router = Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../models/memberModel');

router.get('/', (req, res) => {
  res.render('log-in-form', { member: req.member });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  })
);

router.get('/log-out', (req, res) => {
  req.logout();
});

module.exports = router;
