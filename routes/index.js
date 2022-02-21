const Router = require('express');
const router = Router();
const messageController = require('../controllers/messageController');

/* Get home page */
router.get('/', messageController.message_list);

// GET the message form page
router.get('/message', messageController.message_create_get);

// POST the message form page
router.post('/message', messageController.message_create_post);

// GET the delete message page
router.get('/delete', messageController.message_delete_get);

//  POST the delete message page
router.post('/delete', messageController.message_delete_post);

module.exports = router;

// // Display list on all Messages.
// exports.message_list = (req, res) => {
//     res.send('NOT IMPLEMENTED: Message list');
// };

// // Display form page of creating message
// exports.message_create_get = () => {
// 	res.send('NOT IMPLEMENTED: Message Create GET')
// }

// // Handlle creation of message on POST
// exports.message_create_post = () => {
// 	res.send('NOT IMPLEMENTED: Message Create POST')
// }

// // Admin will have ability to delete posts: GET form
// exports.message_delete_get = () => {
// 	res.send('NOT IMPLEMENTED: Message delete GET')
// }

// // Admin will have ability to delete posts: POST form
// exports.message_delete_post = () => {
// 	res.send('NOT IMPLEMENTED: Message Create POST')
// }
