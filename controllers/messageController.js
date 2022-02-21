const res = require('express/lib/response');
var Message = require('../models/messageModel');

// Display list on all Messages.
exports.message_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Message list');
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
