var Message = require('../models/messageModel.js');
let Member = require('../models/memberModel.js');

// Display list on all Messages.
exports.message_list = (req, res, next) => {
  Message.find({})
    .sort({ added_time: 1 })
    .populate('member')
    .exec((err, list_messages) => {
      if (err) {
        return next(err);
      } else {
        res.render('index', {
          title: 'Members Secret Club',
          msg: list_messages,
          len: list_messages.length,
          user: req.member,
        });
      }
    });
};

// Display form page of creating message
exports.message_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Message Create GET');
};

// Handlle creation of message on POST
exports.message_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Message Create POST');
};

// Admin will have ability to delete posts: GET form
exports.message_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Message delete GET');
};

// Admin will have ability to delete posts: POST form
exports.message_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Message Create POST');
};
