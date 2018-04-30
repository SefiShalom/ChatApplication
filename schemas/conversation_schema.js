var mongoose = require('mongoose');

var Conversation = new mongoose.Schema({
  users: {type: Array, default: []},
  creation_date: {type: Date, dafault: Date.now()},
  hidden: {type: Boolean, default: false},
  messages: {type: Array, default: []}
});

module.exports = mongoose.model('Conversation', Conversation);
