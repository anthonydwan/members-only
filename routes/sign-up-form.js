const Router = require('express');
const router = Router();
const Member = require('../models/memberModel');

// GET the message form page
router.get('/', (req, res) => res.render('sign-up-form'));

// POST the message form page
router.post('/', (req, res, next) => {
  const member = new Member({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password, //TODO: needs to be encrypted
    is_admin: false,
    in_secret_club: false,
  }).save((err) => {
    //saving it into the mongoDB
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
