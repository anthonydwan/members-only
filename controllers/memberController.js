// original message time from core message board
// const messages = [
//   {
//     text: 'Hi there!',
//     user: 'Amando',
//     added: new Date(),
//   },
//   {
//     text: 'Hello World!',
//     user: 'Charles',
//     added: new Date(),
//   },
// ];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = Schema({
  member: { type: Schema.Types.ObjectId, ref: 'Member' },
  text: {
    type: String,
    required: true,
    minlen: [10, 'Message too short! It should be more than 10 characters.'],
    maxlen: [1000, 'Message too long! Keep it within 1000 characters.'],
  },
  added: { type: Date },
});

module.exports = mongoose.model('Member', messageSchema);
