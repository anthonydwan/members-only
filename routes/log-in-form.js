const Router = require('express');
const router = Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('log-in-form', { member: req.member });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

router.get('/log-out', (req, res) => {
  req.logout();
});

module.exports = router;
