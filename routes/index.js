const Router = require('express');
const router = Router();



/* Get home page */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Members Only Board',
    msg: messages,
    len: messages.length,
  });
});

module.exports = router;
