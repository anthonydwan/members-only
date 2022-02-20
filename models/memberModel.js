const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let memberSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { typ: Boolean, required: true },
});

module.exports = mongoose.model('Member', memberSchema);
