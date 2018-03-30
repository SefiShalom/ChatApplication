var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  conversationID: String,
  senderID: String,
  receiverID: [],
  date: Date,
  Time: Date,
  read: Boolean,
  hidden: Boolean,
  content: String
});

module.exports = mongoose.model('Message', Message);
