const Router = require('express');
const router = Router();

/* Get message-form page */
// remember that you are already on /message based on the router in app
router.get('/', (req, res) => {
  res.render('message-form');
});

// POST message-form page
router.post('/', (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  // this one would redirect back to index
  res.redirect('/');
});

// // GET the message form page
// router.get('/message', messageController.message_create_get);

// // POST the message form page
// router.post('/message', messageController.message_create_post);

module.exports = router;
