import Router from 'express';

const router = Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

/* Get home page */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Members Only Board',
    msg: messages,
    len: messages.length,
  });
});

module.exports = router;
